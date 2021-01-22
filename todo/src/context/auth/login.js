import React, { useContext, useState } from 'react';
import { setRawCookie } from 'react-cookies';
import { LoginContext } from './auth-context';
import cookie from 'react-cookies';
// perhaps I should make some context to keep track of people logging in and out
// this should just be a form

function Login(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loginContext = useContext(LoginContext);

  const handleSubmit = e => {
    console.log('entire event', e);
    e.preventDefault();
    // send username and password to context
    console.log('inside handleSubmit username/password', username, password);
    loginContext.login(username, password);
  }

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleLogout = () => {
    cookie.remove();
    loginContext.setLogInState(false, null, {});
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleNameChange} type="text" name="name" />
        <input onChange={handlePasswordChange} type="password" name="password" />
        <button>Sign In</button>
      </form>
      <button onClick={handleLogout}>Sign Out</button>
    </>
  )
}

export default Login;