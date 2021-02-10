import { React } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { HouseDoor, Book, PersonSquare, Key } from 'react-bootstrap-icons';
import { UtiliseAUTH } from '../Context/Auth';
import { useTranslation } from 'react-i18next';

function BarreNavigation() {
    const { nomUtilisateur } = UtiliseAUTH();
    const { setAuthentificationUtilisateur, authentificationUtilisateur } = UtiliseAUTH();
    const { setAuthentificationAdmin, authentificationAdmin } = UtiliseAUTH();
    const { setNomUtilisateur, setIdUtilisateur } = UtiliseAUTH();
    const { t } = useTranslation();

    function SeDeconnecter() {
        setAuthentificationUtilisateur(false);
        setAuthentificationAdmin(false);
        setNomUtilisateur('');
        setIdUtilisateur('');
    }

    function MiseAJourAffichage() {

        if (authentificationUtilisateur === true && authentificationAdmin === false) {
            return (
                <DropdownButton id="btnProfile" variant={"secondary"} title={nomUtilisateur}>
                    <LinkContainer to="/pageProfile">
                        <Nav.Link className="pr-0" ><Dropdown.Item as="button">Profile</Dropdown.Item></Nav.Link>
                    </LinkContainer>
                    <Dropdown.Item as="button" onClick={() => SeDeconnecter()}>Se Déconnecter</Dropdown.Item>
                </DropdownButton>
            )
        }
        else if (authentificationUtilisateur === false && authentificationAdmin === true) {
            return (
                <DropdownButton id="btnProfile" variant={"secondary"} title="Administrateur">
                    <Dropdown.Item as="button" onClick={() => SeDeconnecter()}>Se Déconnecter</Dropdown.Item>
                </DropdownButton>
            )
        }
        else {
            return (
                <>
                    <LinkContainer to="/pageConnection">
                        <Nav.Link className="pr-0" ><Button variant="dark">{t('connecter')}</Button></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pageRegistre">
                        <Nav.Link className="pr-0"  ><Button variant="dark">Créer un compte</Button></Nav.Link>
                    </LinkContainer>
                </>
            )
        }

    }

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link > <HouseDoor className="mb-1 mr-1" size={14} />{t('accueil')}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/repertoire">
                            <Nav.Link> <Book className="mb-1 mr-1" size={14} />{t('repertoire')}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/espaceClient">
                            <Nav.Link variant={"info"}><PersonSquare className="mb-1 mr-1" size={14} />{t('espaceclient')}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin">
                            <Nav.Link><Key className="mb-1 mr-1" size={14} />{t('admin')}</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <MiseAJourAffichage />
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default BarreNavigation;