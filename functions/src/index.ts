// functions/src/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Callable function: set admin claim
export const setAdminRole = functions.https.onCall(async (data, context) => {
    // SECURITY: only allow if caller is authenticated and already has admin claim
    if (!context.auth || !context.auth.token?.admin) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Only admins can assign admin roles."
        );
    }

    const { uid, email } = data;
    if (!uid && !email) {
        throw new functions.https.HttpsError("invalid-argument", "Provide uid or email");
    }

    // Resolve target user by uid or email
    let userRecord;
    if (uid) userRecord = await admin.auth().getUser(uid);
    else userRecord = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(uid, { role: "admin" });

    // Optionally, write a log or update users collection for audit
    const db = admin.firestore();
    await db.collection("admin_logs").add({
        action: "setAdmin",
        targetUid: userRecord.uid,
        targetEmail: userRecord.email,
        actorUid: context.auth.uid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: `${userRecord.email} is now admin` };
});

// Callable function: remove admin claim
export const removeAdminRole = functions.https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.token?.admin) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Only admins can remove admin roles."
        );
    }

    const { uid, email } = data;
    if (!uid && !email) {
        throw new functions.https.HttpsError("invalid-argument", "Provide uid or email");
    }

    let userRecord;
    if (uid) userRecord = await admin.auth().getUser(uid);
    else userRecord = await admin.auth().getUserByEmail(email);

    await admin.auth().setCustomUserClaims(uid, { admin: false })

    const db = admin.firestore();
    await db.collection("admin_logs").add({
        action: "removeAdmin",
        targetUid: userRecord.uid,
        targetEmail: userRecord.email,
        actorUid: context.auth.uid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: `${userRecord.email} is no longer admin` };
});
