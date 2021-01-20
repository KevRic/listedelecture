import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function BarreNavigation() {
    return (
        <Navbar bg="light" expand="sm" className="mb-4">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link>Accueil</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/repertoire">
                        <Nav.Link>Repertoire</Nav.Link>
                    </LinkContainer>
                   
                    
                    <LinkContainer to="/espaceClient">
                        <Nav.Link variant={"info"}>Espace Client</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin">
                        <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>

                </Nav>
                <LinkContainer to="/pageConnection">
                       <Nav.Link className="mr-0">Connection</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/pageRegistre">
                       <Nav.Link className="mr-0">Registre</Nav.Link>
                </LinkContainer>
            </Navbar.Collapse>
            
        </Navbar>
    );
}

export default BarreNavigation;