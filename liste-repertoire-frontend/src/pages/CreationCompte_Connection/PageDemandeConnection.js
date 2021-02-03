import { React } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PageConnection() {
    return (
        <Container fluid>

            <Alert variant={"dark"} className="mt-3">
                <h1>Vous devez être connecter pour accéder à cette Page</h1>
            </Alert>

            <Row>
                <Link to="pageConnection" className="btn btn-link pr-0">Se Connecter</Link>
                <Link to="pageRegistre" className="btn btn-link pr-0">Créer un compte?</Link>
            </Row>
        </Container>
    );
}

export default PageConnection;