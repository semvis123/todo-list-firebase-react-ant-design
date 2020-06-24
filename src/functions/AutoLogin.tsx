import { firebase } from '../firebaseConfig';
import { message } from 'antd';
export default function AutoLogin(account, setAccount) {
    if (!account.uid) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                message.success('Logged in successfully');
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