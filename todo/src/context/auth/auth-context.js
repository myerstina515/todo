import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

const API = 'https://auth-server-401d39.herokuapp.com';
// process.env.REACT_APP_API; 
// REACT_APP_API=https://auth-server-401d39.herokuapp.com

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, password) => {
    console.log('before fetch', username, password);
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
      }),
    })
      .then(response => {
        console.log('response from server', response);
        return response.json();
      })
      .then(user => {
        console.log('user', user);
        validateToken(user.token);
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const validateToken = (token) => {
    console.log(token);
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      console.log('made it inside validateToken', user);
      setUser(user);
      setLogInState(true, token, user);
    }
    catch {
      setLogInState(false, null, {});
    }
  }

  // const logout = () => {
  //   console.log('button clicked')
  //   setLogInState(false, null, {})
  // }

  const setLogInState = (loggedIn, token, user) => {
    console.log('inside setLogInState', user)
    cookie.save('auth', token);
    setLoggedIn(true);
  }

  const state = {
    user,
    loggedIn,
    login: login,
    setLogInState: setLogInState
  }

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginProvider

// post to /signin
    // need our API url
    // a library or fetch
    // our backend is expecting us to send our username and password encoded in the headers
    // some sort of function to update username and password

    // state
      // need an updateUserName(username)
      // need an updatePassword(password)

  // we should be getting back a token with a user object from the ba