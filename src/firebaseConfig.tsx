import * as _firebase from 'firebase';
const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: ''
};
if (!_firebase.apps.length) {
    _firebase.initializeApp(firebaseConfig);
}

export const firebase = _firebase;