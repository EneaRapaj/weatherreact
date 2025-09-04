import React from 'react';
import { Navbar, Container,Nav ,NavDropdown  } from 'react-bootstrap';

function Setting () {
    return ( 
        <Navbar bg='light'  className='navi' >
      <Container fluid>
      <Navbar.Brand href="#home" bg='dark' className='Setting '>Setting</Navbar.Brand>
        <Navbar.Brand href="#home" className='dropdown1 text-dark'>Temperature:</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">°C</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              °F
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand href="#home" className='dropdown2 text-dark'>
Wind speed:
</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">kilometer/hour</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                meter/hour
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
}

export default Setting ;
