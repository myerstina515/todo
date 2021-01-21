import React from 'react';
import './App.scss';
import ToDo from './components/todo.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AppSettingsContext from './context/settings/context';
import SettingsContext from './context/settings/settings';

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppSettingsContext>
          <SettingsContext>
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
          </SettingsContext>
        </AppSettingsContext>
      </>
    );
  }
}
