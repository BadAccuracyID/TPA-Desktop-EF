import {auth, firestore} from "@/components/datastore/firebase/FirebaseConfig";
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    inMemoryPersistence,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signOut
} from "@firebase/auth";
import {collection, doc, getDocs, setDoc} from "@firebase/firestore";

// Authentication Methods
export const signIn = async (email: string, password: string, remember: boolean) => {
    if (remember) {
        return await setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
    } else {
        return await setPersistence(auth, inMemoryPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
    }
};

export const register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    return await signOut(auth)
};

export const forgotPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
};

// Current User Methods
export const firebaseUser = async () => {
    return auth.currentUser;
}

// Firestore Methods
export const initUserData = async (userId: string, name: string, email: string) => {
    try {
        await setDoc(doc(firestore, 'users', userId), {
            name: name,
            email: email,
            role: 'Staff',
            verified: false,
            createdAt: new Date(),
            verifiedBy: null,
            verifiedAt: null,
        });

        await setDoc(doc(firestore, 'awaitingVerification', userId), {
            name: name,
            email: email,
            createdAt: new Date(),
        });
    } catch (error) {
        throw error;
    }
}

export const getUserData = async (userId: string) => {
    try {
        const collectionRef = collection(firestore, 'users');
        const docRef = await getDocs(collectionRef);

        if (!docRef.empty) {
            let data = docRef.docs.find(doc => doc.id === userId);
            if (data) {
                console.log('1: ' + data);
                console.log('2: ' + data.data());
                return data.data();
            } else {
                throw new Error('Data not found');
            }
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

