import React, { useEffect } from 'react';
import './App.css';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import { accountState } from './recoil/atoms';
import {
  useRecoilState,
} from 'recoil';
import AutoLogin from './functions/AutoLogin';

const { Content, Footer } = Layout;



function App() {
  let [account, setAccount] = useRecoilState(accountState);
  useEffect(()=>{
    AutoLogin(account, setAccount);
  },[]);
    return (
    <div className="App">
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, }}>
              <Switch>
                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/Logout">
                  <Logout />
                </Route>
                <Route exact path="/Settings">
                  <Settings />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2020 Created by semvis123</Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
