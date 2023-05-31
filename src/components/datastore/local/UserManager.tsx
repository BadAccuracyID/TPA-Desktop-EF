import {firebaseUser, getAllUsers, getUserData} from "@/components/datastore/firebase/FirebaseManager";
import {Account} from "@/components/objects/Account";

export const getCurrentAccount = () => {
    return firebaseUser().then((user) => {
        if (!user) {
            return null;
        }

        return getUserData(user.uid).then((data) => {
            return Account.fromDocumentData(data);
        })
    })
}

export const getAccount = (uid: string) => {
    return getUserData(uid).then((data) => {
        return Account.fromDocumentData(data);
    })
}

export const getAllAccounts = () => {
    return getAllUsers().then((users) => {
        return users.map((user) => {
            return Account.fromDocumentData(user);
        })
    });
}
