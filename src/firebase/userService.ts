/* eslint-disable @typescript-eslint/no-explicit-any */
// src/firebase/userService.ts
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    collection,
    query,
    getDocs,
    where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";

export type AppUser = {
    uid: string;
    email: string;
    displayName?: string;
    role: "admin" | "user";
    createdAt?: any;
};

// --- Create auth user + user doc in Firestore ---
export async function registerUser(email: string, password: string, displayName?: string): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // update displayName on firebase auth profile (optional)
    if (displayName) {
        await updateProfile(user, { displayName });
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDoc: Omit<AppUser, "uid"> = {
        email: user.email || "",
        displayName: displayName || user.displayName || "",
        role: "user", // default role = 'user'
        createdAt: serverTimestamp(),
    };

    await setDoc(userDocRef, userDoc);
    return { uid: user.uid, ...userDoc } as AppUser;
}

// --- Sign in ---
export async function loginUser(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

// --- Sign out ---
export async function logoutUser() {
    return await signOut(auth);
}

// --- Get user doc by uid ---
export async function getUserById(uid: string): Promise<AppUser | null> {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { uid: snap.id, ...(snap.data() as any) } as AppUser;
}

// --- Update user role (admin action) ---
export async function setUserRole(uid: string, role: "admin" | "user") {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, { role });
}

// --- List all users (admin) ---
export async function listAllUsers(): Promise<AppUser[]> {
    const q = query(collection(db, "users"));
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ uid: d.id, ...(d.data() as any) } as AppUser));
}

// --- Find users by role (helper) ---
export async function getUsersByRole(role: "admin" | "user"): Promise<AppUser[]> {
    const q = query(collection(db, "users"), where("role", "==", role));
    const snaps = await getDocs(q);
    return snaps.docs.map((d) => ({ uid: d.id, ...(d.data() as any) } as AppUser));
}
