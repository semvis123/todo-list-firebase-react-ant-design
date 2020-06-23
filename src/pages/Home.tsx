import React from 'react';
import Title from 'antd/lib/typography/Title';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { accountState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';



function Home() {
    // const [moveToPage, setNewPage] = useState(null);
    // const changePage = (newPage) => {
    //     setNewPage(<Redirect push to={newPage} />);
    // }
        let account = useRecoilValue(accountState);
        // console.log('account');
        return (
            <div>
            {/* {moveToPage ? moveToPage : ''} */}
            <Texty component={Title} type='top'>Todo</Texty>
            {account.uid ? <div> You are logged in, congratulations!</div>: <div>You can login for cloud sync!</div>}
        </div>
    );
}

export default Home;