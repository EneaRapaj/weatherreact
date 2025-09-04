import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
  Figure,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Capture from "../image/Capture.jpg";
import bbc from "../image/bbc.jpg";
import DataExchange from "../DataExhange"; // kontrollo rrugën/saktësinë e emrit të skedarit


function NavbarComp({ onSelectLocation }) {
  const [query, setQuery] = useState("");

  const {
    isError,
    isLoading,
    weather,
    suggestions,
    submitRequest,
    fetchWeather,
    clearSuggestions,
  } = DataExchange();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    submitRequest(query);
  };

  const handleSelect = (s) => {
    setQuery(s.display);
    clearSuggestions();

    const city = s.city || s.displayName || "Unknown City";
    const country = s.country || s.adminDistrict || "Unknown Country";

    // Dërgo qytetin dhe shtetin te LocationBox
    onSelectLocation(city, country, s.lat, s.lon); // ✅ kalon lat/lon

    fetchWeather(s.lat, s.lon); // merr motin
    
  };

  return (
    <div className="weatherprog">
      <Navbar className="navbar" bg="067eb3" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <Figure>
              <Figure.Image className="bbc pt-4" alt="logo bbc" src={bbc} />
            </Figure>
          </Navbar.Brand>

          <Navbar.Brand href="#">
            <Figure>
              <Figure.Image className="weather pt-4" alt="weather" src={Capture} />
            </Figure>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex" onSubmit={onSubmit}>
              <FormControl
                type="search"
                placeholder="Enter City"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: "red" }}>{isError}</p>}

      {suggestions.length > 0 && (
        <Dropdown show className="m-3">
          <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
            {suggestions.map((s, i) => (
              <Dropdown.Item key={i} onClick={() => handleSelect(s)}>
                {s.display}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}

      
    </div>
  );
}

export default NavbarComp;
