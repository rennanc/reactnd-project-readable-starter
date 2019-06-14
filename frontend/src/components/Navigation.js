import React from 'react'
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'

export default function Navigation (props) {
  console.log(props)
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={`/`}>Readable Project</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`/`}>Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
              {props.categories.map((category,index) => (
                <NavDropdown.Item key={index} href={`/${category.path}`} >
                  {category.name}
                </NavDropdown.Item>
              ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}