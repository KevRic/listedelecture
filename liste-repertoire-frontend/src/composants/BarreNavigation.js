import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import { HouseDoor } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';
import { PersonSquare } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';


function BarreNavigation() {
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link > <HouseDoor className="mb-1 mr-1" size={14}/>Accueil</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/repertoire">
                            <Nav.Link> <Book className="mb-1 mr-1" size={14}/>Repertoire</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/espaceClient">
                            <Nav.Link variant={"info"}><PersonSquare className="mb-1 mr-1" size={14}/>Espace Client</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin">
                            <Nav.Link><Key className="mb-1 mr-1" size={14}/>Admin</Nav.Link>
                       </LinkContainer>              
                    </Nav>

                    <LinkContainer to="/pageConnection">
                        <Nav.Link className="pr-0" ><Button  variant="dark">Connection</Button></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pageRegistre">
                        <Nav.Link className="pr-0" ><Button variant="dark">Créer un compte</Button></Nav.Link>
                    </LinkContainer>
                </Navbar.Collapse>

            </Navbar>

        </Container>

    );
}

export default BarreNavigation;