import 'firebase/auth';
import 'firebase/firestore';
import {getFirestore} from "@firebase/firestore";
import {initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDOWLiycDc8lhHb9t15PVJe9idC_L3hnZE",
//     authDomain: "tpa-desktop-ef-1.firebaseapp.com",
//     projectId: "tpa-desktop-ef-1",
//     storageBucket: "tpa-desktop-ef-1.appspot.com",
//     messagingSenderId: "1064032104412",
//     appId: "1:1064032104412:web:b9f398aab20389dc92a919",
//     measurementId: "G-NZB7Y1SDHV"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCQPtmbZqD6o905gV-iCOROrVjQdbtVSUQ",
    authDomain: "tpa-desktop-ef-2.firebaseapp.com",
    projectId: "tpa-desktop-ef-2",
    storageBucket: "tpa-desktop-ef-2.appspot.com",
    messagingSenderId: "1082034626413",
    appId: "1:1082034626413:web:a19ef68b77c9b1af20c464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);
export const auth = getAuth(app);
