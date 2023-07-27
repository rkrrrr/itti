import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

function NavbarItti() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Prueba Tecnica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >Home</Nav.Link>
            <NavDropdown title="Acciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Crear Usuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Modificar Usuario
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Eliminar usuario</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Como resolvi la prueba de Logica
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarItti;
