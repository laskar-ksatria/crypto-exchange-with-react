import React from 'react';
import Login from './views/Login';
import Register from './views/Register';
import Main from './views/Main'
import './App.css';
import {  Route, Switch, useHistory, useLocation } from 'react-router-dom';

function App() {

  let history = useHistory();
  let location = useLocation();

  const checkLocal = () => {
    if (localStorage.getItem('exchangetoken')) {
      history.push('/main')
    }else {
      if (location.pathname === '/' | location.pathname === '/register') {
        history.push(location.pathname);
      }
    }
  };

  React.useEffect(checkLocal, [])

  return (
    <div className="App">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
        </Switch>
    </div>
  )

};

export default App;