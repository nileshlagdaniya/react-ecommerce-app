import { Timestamp } from "firebase/firestore";

export interface UserDoc {
    uid: string;
    email: string;
    role: "user" | "admin";
    createdAt?: Timestamp;
}
