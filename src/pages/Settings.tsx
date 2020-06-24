import React from 'react';
import Title from 'antd/lib/typography/Title';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { accountState } from '../recoil/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button, message } from 'antd';
import { firebase } from '../firebaseConfig';


function Home() {
    // const [moveToPage, setNewPage] = useState(null);
    // const changePage = (newPage) => {
    //     setNewPage(<Redirect push to={newPage} />);
    // }
        let [account, setAccount] = useRecoilState(accountState);
        // console.log('account');
        return (
            <div>
            {/* {moveToPage ? moveToPage : ''} */}
            
            <Texty component={Title} type='top'>Settings</Texty>
            {account.uid ? <div> You are logged in, congratulations!</div>: <div>You can login for cloud sync!</div>}
            {account.uid &&<Button onClick={()=>{
                var user = firebase.auth().currentUser;
                let db = firebase.firestore();
                db.collection('users').doc(account.uid).delete().then(()=>{
                  user.delete().then(function() {
                    message.success('Account successfully removed');
                    // User deleted.
                    setAccount({
                      email: undefined,
                      displayName: undefined,
                      isNewUser: undefined,
                      emailVerified: undefined,
                      uid: undefined
                  });
                }).catch(function(error) {
                  // An error happened.
                  message.error('can\'t remove account');
                });
              }).catch((e)=>{throw e});
            }


            }>Delete account</Button>}
        </div>
    );
}

export default Home;