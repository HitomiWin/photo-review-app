import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Link to="/" className="navbar-brand  text-info">
          <span role="img" aria-label="A piggy bank" className="me-3">
            <FontAwesomeIcon icon={faBolt} color="#132744" size="lg" />
          </span>
          My Photo Gallery
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" variant="light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <NavDropdown
                  title={currentUser.email.substring(
                    0,
                    currentUser.email.indexOf("@")
                  )}
                  id="basic-nav-dropdown"
                >
                  <NavLink to="/" className="dropdown-item">
                    My Alubms
                  </NavLink>
                  <NavLink
                    to="/customer-review-albums"
                    className="dropdown-item"
                  >
                    Cunstomer Review
                  </NavLink>
                  <NavDropdown.Divider />
                  <NavLink to="/logout" className="dropdown-item ">
                    Log Out
                  </NavLink>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
