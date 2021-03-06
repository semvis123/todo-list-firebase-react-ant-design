import React, { useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import { Redirect } from 'react-router-dom';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import * as firebaseui from 'firebaseui';
import 'firebaseui/';
import {
    useRecoilState,
} from 'recoil';
import { accountState } from '../recoil/atoms';
import { firebase } from '../firebaseConfig';

export default function Login(props) {
    const [account, setAccount] = useRecoilState(accountState);
    // console.log('rendered');
    useEffect(() => {
        if (account.uid === undefined) {
            // Initialize the FirebaseUI Widget using Firebase.
            var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                        console.log(authResult, redirectUrl);
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        let newAccount = {
                            email: authResult.user.email,
                            displayName: authResult.user.displayName,
                            isNewUser: authResult.additionalUserInfo.isNewUser,
                            emailVerified: authResult.user.emailVerified,
                            uid: authResult.user.uid
                        }
                        setAccount(newAccount);
                        // loggedIn = true;
                        return false;
                    },
                    uiShown: function () {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                signInFlow: 'popup',
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInOptions: [
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: true
                    },
                    {
                        provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    },
                    {
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        customParameters: {
                            // Forces account selection even when one account
                            // is available.
                            prompt: 'select_account'
                        }
                    },
                ],
            };
            ui.start('#firebaseui-auth-container', uiConfig);
        }
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