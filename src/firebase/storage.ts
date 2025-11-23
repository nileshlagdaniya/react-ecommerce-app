// src/firebase/storage.ts

import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File, path: string): Promise<string> {
    const fileRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
}
