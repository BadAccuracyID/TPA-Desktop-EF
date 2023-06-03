import {firebaseUser, getAllAccountData, getAccountData} from "@/components/datastore/firebase/FirebaseManager";
import {Account} from "@/components/objects/Account";

export const getCurrentAccount = () => {
    return firebaseUser().then((user) => {
        if (!user) {
            return null;
        }

        return getAccountData(user.uid).then((data) => {
            return Account.fromDocumentData(data);
        })
    })
}

export const getAccount = (uid: string) => {
    return getAccountData(uid).then((data) => {
        return Account.fromDocumentData(data);
    })
}

export const getAllAccounts = () => {
    return getAllAccountData().then((users) => {
        return users.map((user) => {
            return Account.fromDocumentData(user);
        })
    });
}
