// src/firebase/auth.ts

import { clearUser, setLoading, setUser, } from "@/store/slices/authSlice";
import { auth, db } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { store } from "@/store/store";

export interface AppUser {
    uid: string;
    email: string | null;
    name?: string | null;
    role: "user" | "admin";
}

export async function registerUser(
    name: string,
    email: string,
    password: string
): Promise<AppUser> {
    // 1) Firebase Auth Create
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    // 2) Update Firebase Auth displayName
    await updateProfile(user, { displayName: name });

    // 3) Create Firestore user doc with default role = "user"
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        name,
        email,
        role: "user",
        createdAt: serverTimestamp(),
    });

    return {
        uid: user.uid,
        email: user.email,
        name: name,
        role: "user",
    };
}

export async function loginUser(
    email: string,
    password: string
): Promise<AppUser> {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Fetch role from Firestore
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.data();

    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: data?.role ?? "user"
    };
}

export function logoutUser() {
    return signOut(auth);
}

// // Listen to user state changes & fetch role
// export function onAuthStateChange(
//     callback: (user: AppUser | null) => void
// ) {
//     return onAuthStateChanged(auth, async (user) => {
//         if (!user) {
//             callback(null);
//             return;
//         }

//         const snap = await getDoc(doc(db, "users", user.uid));
//         const data = snap.data();

//         callback({
//             uid: user.uid,
//             email: user.email,
//             name: user.displayName,
//             role: data?.role ?? "user",
//         });
//     });
// }
// onAuthStateChanged(auth, async (user) => {
//     store.dispatch(setLoading(true));
//     if (!user) return setUser(null);

//     const tokenResult = await user.getIdTokenResult(true);
//     const isAdmin = !!tokenResult.claims.admin;

//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     const data = userDoc.data();

//     setUser({
//         uid: user.uid,
//         email: user.email,
//         name: user.displayName || data?.name,
//         role: isAdmin ? "admin" : "user",
//     });
// });


onAuthStateChanged(auth, async (firebaseUser) => {
    store.dispatch(setLoading(true));

    if (firebaseUser) {
        try {
            const ref = doc(db, "users", firebaseUser.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                store.dispatch(
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: snap.data().role, // 🔥 IMPORTANT
                        name: snap.data().name,
                    })
                );
            } else {
                store.dispatch(clearUser());
            }
        } catch (error) {
            console.log("Auth error:", error);
            store.dispatch(clearUser());
        }
    } else {
        store.dispatch(clearUser());
    }

    store.dispatch(setLoading(false));
});