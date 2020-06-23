import React from 'react';
import { Layout, Menu } from 'antd';
import {
    LoginOutlined,
    HomeOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accountState } from '../recoil/atoms';



function Header() {
    let history = useHistory();
    let account = useRecoilValue(accountState);
    const changePage = (e) => {
        // console.log(e);
        history.push(e.key);
    }
    let location = useLocation();

    return (
        <Layout.Header className="site-layout-header" >
            <div className="logo"><p className="logo-text">TODO-List</p></div>
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} selectedKeys={[location.pathname]} mode="horizontal" onSelect={changePage} >
                <Menu.Item key="/" icon={<HomeOutlined />} style={{ float: 'left' }}>
                    Home
                </Menu.Item>
                {account.uid ? <Menu.Item key="/logout" icon={<LogoutOutlined />} style={{ float: 'right' }} >
                    Logout
                </Menu.Item> :
                    <Menu.Item key="/login" icon={<LoginOutlined />} style={{ float: 'right' }} >
                        Login
                </Menu.Item>
                }
            </Menu>
        </Layout.Header>
    );
}

export default Header;
