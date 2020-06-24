import React, { useEffect } from 'react';
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
import { message } from 'antd';

export default function Login(props) {
    const [account, setAccount] = useRecoilState(accountState);
    // console.log('rendered');
    useEffect(()=>{
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            message.info('Logged out successfully');
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
    },[])
    return (
        <>
            {!account.uid &&<Redirect to={'/'} /> }
        </>
    );
}