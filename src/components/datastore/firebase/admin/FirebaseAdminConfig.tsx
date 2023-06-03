import {applicationDefault, initializeApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';

const adminApp = initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://TPA-Desktop-EF-1.firebaseio.com'
}, 'adminApp');

export const adminAuth = getAuth(adminApp);
