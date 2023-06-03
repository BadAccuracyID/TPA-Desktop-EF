import {auth, firestore} from "@/components/datastore/firebase/FirebaseConfig";
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    inMemoryPersistence,
    onAuthStateChanged,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
    User
} from "@firebase/auth";
import {collection, doc, getDocs, setDoc} from "@firebase/firestore";
import {AccountShift} from "@/components/objects/AccountShift";

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
    cachedUser = null;
    return await signOut(auth)
};

export const forgotPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
};

// Current User Methods
let cachedUser: User | null = null;
export const firebaseUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        if (cachedUser) {
            console.log('cachedUser');
            resolve(cachedUser);
        } else {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                cachedUser = user;
                resolve(user);
            }, reject);
        }
    });
};

// Firestore Methods
export const initUserData = async (userId: string, name: string, email: string) => {
    try {
        await setDoc(doc(firestore, 'users', userId), {
            uid: userId,
            name: name,
            email: email,
            role: 'Staff',
            shift: 'Select Shift',
            verified: false,
            createdAt: new Date(),
            verifiedBy: null,
            verifiedAt: null,
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

export const getAllUsers = async () => {
    try {
        const collectionRef = collection(firestore, 'users');
        const docRef = await getDocs(collectionRef);

        if (!docRef.empty) {
            return docRef.docs.map(doc => doc.data());
        } else {
            throw new Error('No users found');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Account methods
export const verifyAccount = async (userId: string, shift: AccountShift, verifiedBy: string) => {
    try {
        await setDoc(doc(firestore, 'users', userId), {
            shift: shift,
            verified: true,
            verifiedBy: verifiedBy,
            verifiedAt: new Date(),
        }, {merge: true});
    } catch (error) {
        throw error;
    }
}
