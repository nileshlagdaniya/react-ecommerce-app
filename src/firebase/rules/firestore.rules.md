rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {

    // USERS
    match /users/{uid} {
      // Any logged-in user can read his own data
      allow read: if request.auth != null && request.auth.uid == uid;

      // User can write only his own document
      allow write: if request.auth != null && request.auth.uid == uid;

      // Admin can read & update any user
      allow read, update: if request.auth != null && request.auth.token.role == "admin";
    }

    // PRODUCTS (only admin can write)
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == "admin";
    }

    // ORDERS
    match /orders/{id} {
      // User can create
      allow create: if request.auth != null;

      // User can read only his own order
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      // Admin can read all
      allow read: if request.auth != null
                  && request.auth.token.role == "admin";
    }

}
}
