import React from 'react';
import './App.scss';
import Login from './context/auth/login';
import LoginContext from './context/auth/auth-context';
import Auth from './context/auth/auth';
import If from './components/if/if';



function App() {

  // const DeleteLink = props => {
  //   return (
  //     <Auth capability='delete'>
  //       <button>delete</button>
  //     </Auth>
  //   )
  // }


  return (
    <>
      <div className="App">
        <LoginContext>
          <Login />
          {/* <DeleteLink /> */}
          <If />
        </LoginContext>

      </div>

    </>
  );
}


export default App;