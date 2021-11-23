import React, {useContext}from 'react'

import { CarritoContext } from '../../context/carritoContext';
import './navigation.css'
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
/* import './Navbar.css' */
import { Link } from 'react-router-dom'
function Navigation() {
  const { carrito } = useContext(CarritoContext);
  const totalCarrito = carrito.reduce((total, prod) => {
    return total + prod.cantidad;
}, 0);
    return (
      <div>
        <Navbar bg="light" expand="md">
        <Container >
          <Navbar.Brand>Wiki</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </Form>
  
            <Nav className="me-auto ">
              
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/carrito">
                Carrito{ totalCarrito===0? "":
                <span className="text-primary fs-6 fw-bold mx-1">{totalCarrito}</span>}
              </Link>
            </Nav>
            <Nav>
              <Link className="nav-link" to="/register">
              <Button variant="warning">Regístrese</Button>
              </Link>
            </Nav>
  
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    )
}

export default Navigation
