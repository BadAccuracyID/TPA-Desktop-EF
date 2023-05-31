import {firebaseUser, getUserData} from "@/components/datastore/firebase/FirebaseManager";
import {Account} from "@/components/objects/Account";

export const getCurrentAccount = () => {
    return firebaseUser().then((user) => {
        if (!user) {
            return null;
        }

        return getUserData(user.uid).then((data) => {
            const account = new Account(user.uid);
            account.setName(data['name']);
            account.setVerified(data['verified']);
            account.setRole(data['role']);

            return account;
        })
    })
}

export const getAccount = (uid: string) => {
    return getUserData(uid).then((data) => {
        const account = new Account(uid);
        account.setName(data['name']);
        account.setVerified(data['verified']);
        account.setRole(data['role']);

        return account;
    })
}
