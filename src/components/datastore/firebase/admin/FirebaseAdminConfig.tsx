import admin, {credential} from "firebase-admin"
import applicationDefault = credential.applicationDefault;

if (!admin.apps.length) {
    admin.initializeApp({
        credential: applicationDefault(),
    })
}
