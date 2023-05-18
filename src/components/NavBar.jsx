import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../index.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <Navbar
      sticky="top"
      className=" me-auto mb-5"
      style={{ backgroundColor: "#6600cc00" }}
    >
      <Container>
        <motion.div
          className="m-auto"
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 70 }}
        >
          <Nav>
            <Nav.Link
              to="/"
              as={NavLink}
              className="nav-link"
              style={{
                position: "relative",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to="/contact"
              as={NavLink}
              className="nav-link"
              style={{
                position: "relative",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              Contact
            </Nav.Link>
          </Nav>
        </motion.div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
