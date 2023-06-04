import admin from "firebase-admin"

const serviceAccount = require("../../../../../key-1.json");

let adminApp: admin.app.App | null = null;

export function getAdminApp() {
    if (admin.apps.length) {
        adminApp = admin.apps[0];
    } else {
        adminApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        }, "adminApp");
    }

    return adminApp;
}
