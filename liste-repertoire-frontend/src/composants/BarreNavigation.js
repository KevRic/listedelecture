import { React ,useState}from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { HouseDoor } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';
import { PersonSquare } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';
import {UtiliseAUTH} from '../Context/Auth'

function BarreNavigation() {
    const {nomUtilisateur} =UtiliseAUTH();
    const {setAuthentificationUtilisateur} =UtiliseAUTH();
    const {setAuthentificationAdmin} =UtiliseAUTH();
    const{setNomUtilisateur}=UtiliseAUTH();
    const {MasquerPageEnregistreEtConnection}=UtiliseAUTH();
    const {MasquerPageProfile}=UtiliseAUTH();
    function SeDeconnecter(){
        setAuthentificationUtilisateur(false);
        setAuthentificationAdmin(false);
        setNomUtilisateur('');
        
    }
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

                    <LinkContainer style={{display:MasquerPageEnregistreEtConnection}} to="/pageConnection">
                        <Nav.Link className="pr-0" ><Button  variant="dark">Connection</Button></Nav.Link>
                    </LinkContainer>
                    <LinkContainer style={{display:MasquerPageEnregistreEtConnection}} to="/pageRegistre">
                        <Nav.Link className="pr-0"  ><Button variant="dark">Créer un compte</Button></Nav.Link>
                    </LinkContainer>

                    <DropdownButton id="btnProfile" style={{display:MasquerPageProfile}} variant={"secondary"} title={nomUtilisateur}>
                    <LinkContainer to="/pageProfile">
                        <Nav.Link className="pr-0" ><Dropdown.Item as="button">Profile</Dropdown.Item></Nav.Link>
                    </LinkContainer>
                        <Dropdown.Item as="button" onClick={()=>SeDeconnecter()}>Se déconnecter</Dropdown.Item>
                     </DropdownButton>
                </Navbar.Collapse>

            </Navbar>

        </Container>

    );
}

export default BarreNavigation;