import {auth, firestore} from "@/components/datastore/FirebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {collection, getDocs} from "@firebase/firestore";

// Authentication Methods
export const signIn = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

// Firestore Methods
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
};

