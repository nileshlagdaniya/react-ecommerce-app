// src/firebase/firestore.ts

import { db } from "./firebaseConfig";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";

// ---------- USERS ----------
export async function getUser(uid: string) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
}

export async function getUserRole(uid: string) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
        return snap.data().role || "user";
    }
    return "user";
}
export function setRoleClass(role: "admin" | "user") {
    const html = document.documentElement;

    // remove old role classes
    html.classList.remove("admin", "user");

    // add new
    html.classList.add(role);
}
export async function updateUserRole(uid: string, role: "user" | "admin") {
    await updateDoc(doc(db, "users", uid), { role });
}

// ---------- PRODUCTS ----------
export async function addProduct(data: any) {
    return await addDoc(collection(db, "products"), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function updateProduct(id: string, data: any) {
    return await updateDoc(doc(db, "products", id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteProduct(id: string) {
    return deleteDoc(doc(db, "products", id));
}

export async function getAllProducts() {
    const snap = await getDocs(collection(db, "products"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductsByCategory(category: string) {
    const q = query(
        collection(db, "products"),
        where("category", "==", category)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ---------- ORDERS ----------
export async function createOrder(data: any) {
    return await addDoc(collection(db, "orders"), {
        ...data,
        createdAt: serverTimestamp(),
    });
}

export async function getUserOrders(uid: string) {
    const q = query(collection(db, "orders"), where("userId", "==", uid));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
