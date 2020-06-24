import React from 'react';
import Title from 'antd/lib/typography/Title';
import { Redirect } from 'react-router-dom';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import 'firebaseui/';
import {
    useRecoilState,
} from 'recoil';
import { accountState } from '../recoil/atoms';
import { firebase } from '../firebaseConfig'

export default function Login(props) {
    const [account, setAccount] = useRecoilState(accountState);
    // console.log('rendered');
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        setAccount({
            email: undefined,
            displayName: undefined,
            isNewUser: undefined,
            emailVerified: undefined,
            uid: undefined
        });
    }, function (error) {
        // An error happened.
    });
    return (
        <>
            <Texty component={Title}>Login</Texty>
            {account.uid ? <Redirect to={'/'} /> :
                <div>
                    <div id="firebaseui-auth-container"></div>
                    <div id="loader">Loading...</div>
                </div>}
        </>
    );
}