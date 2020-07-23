import React from 'react';
import Login from './views/Login';
import Register from './views/Register';
import Main from './views/Main'
import './App.css';
import {  Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Loop from './views/Loop';
import { inititalState, reducer } from './function'

export const UserContext = React.createContext();

function App() {

  let history = useHistory();
  let location = useLocation();

  const [{ user }, dispatch] = React.useReducer(reducer, inititalState);

  const checkLocal = () => {
    if (localStorage.getItem('exchangetoken')) {
      history.push(location.pathname)
    }else {
      if (location.pathname === '/' | location.pathname === '/register') {
        history.push(location.pathname);
      }
    }
  };

  React.useEffect(checkLocal, [])

  return (
    <UserContext.Provider value={{user, dispatch}}>
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
            <Route path="/loop">
              <Loop />
            </Route>
          </Switch>
      </div>
    </UserContext.Provider>
  )

};

export default App;