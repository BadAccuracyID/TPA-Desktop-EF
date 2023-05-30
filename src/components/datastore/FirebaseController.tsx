import {auth, firestore} from "@/components/datastore/FirebaseConfig";

// Authentication Methods
export const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const response = await auth.signInWithEmailAndPassword(email, password);
        return response.user;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

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
        const doc = await firestore.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

