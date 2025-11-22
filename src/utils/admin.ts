// src/utils/admin.ts (frontend)
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "@/firebase/firebaseConfig"; // your default export app
import { getAuth } from "firebase/auth";

const functions = getFunctions(app);

export async function promoteToAdminByEmail(email: string) {
    const setAdmin = httpsCallable(functions, "setAdminRole");
    return await setAdmin({ email });
}
