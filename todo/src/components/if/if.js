//import React from 'react';
import ToDo from '../todo';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AppSettingsContext from '../../context/settings/context';
import Auth from '../../context/auth/auth';
import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../../context/auth/auth-context';



function If(props) {

  //const [okToRender] = Auth();
  //console.log('Line 15 ok to render', okToRender);
  console.log('Line 13 props', props);
  // console.log('PROPS.OKTORENDER', props.okToRender);
  // const [okToRender, setOkToRender] = useState(false);
  // const loginContext = useContext(LoginContext);
  // // console.log('newest consolelog', LoginContext)
  // useEffect(() => {
  //   console.log('loginContext', loginContext)
  //   setOkToRender(
  //     loginContext.loggedIn && (props.capability ? loginContext.user.capabilities.includes(props.capability) : false)
  //   )
  // }, [loginContext, props.capability])
  // console.log(okToRender, loginContext.loggedIn)

  // return (
  //   okToRender &&
  //   <div>{props.children}</div>
  // )


  return (

    // okToRender &&
    <Auth capability="read">
      < AppSettingsContext >
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="#home">To Do</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ToDo />

      </AppSettingsContext >
    </Auth>
  )

}

export default If;
