import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "./setting.css";

function Setting({ onUnitChange }) {
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [windUnit, setWindUnit] = useState('kilometer/hour');

  const handleTemperatureChange = (unit) => {
    setTemperatureUnit(unit);
    if (onUnitChange) onUnitChange(unit, windUnit); // njofton parent për ndryshim
  };

  const handleWindChange = (unit) => {
    setWindUnit(unit);
    if (onUnitChange) onUnitChange(temperatureUnit, unit); // njofton parent për ndryshim
  };

  return (
    <Navbar bg='light' className='navi'>
      <Container fluid>
        <Navbar.Brand href="#home" className='Setting'>Setting</Navbar.Brand>

        <Navbar.Brand href="#home" className='dropdown1 text-dark'>Temperature:</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={temperatureUnit}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => handleTemperatureChange('°C')}>°C</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTemperatureChange('°F')}>°F</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand href="#home" className='dropdown2 text-dark'>Wind speed:</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example-2"
              title={windUnit}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={() => handleWindChange('kilometer/hour')}>kilometer/hour</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleWindChange('miles/hour')}>miles/hour</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Setting;
