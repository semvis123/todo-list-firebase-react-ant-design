import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';
export default function AutoLogin(account, setAccount) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    if (!account.uid) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log(user);
                let newAccount = {
                    email: user.email,
                    displayName: user.displayName,
                    isNewUser: false,
                    emailVerified: user.emailVerified,
                    uid: user.uid
                }
                setAccount(newAccount);
            }
        });
    }
};