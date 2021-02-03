import React from 'react';
import { Alert, Tabs, Tab, Container } from 'react-bootstrap';
import ListePiecesAdmin from '../../composants/ListePiecesAdmin';
import ListeDemandesSpecialesAdmin from '../../composants/ListeDemandeSpecialeAdmin';

function PageAdmin() {

    return (
        <Container fluid>
            <Alert variant={"dark"} className="mt-3">
                <h1>Page administrateur</h1>
            </Alert>

            <Tabs transition={false} id="choixTabadministrateur">
                <Tab eventKey="admin" title="Manipulation de pieces">
                    <ListePiecesAdmin />
                </Tab>

                <Tab eventKey="tabManipulationdemande" title="Manipulation demandes speciales">
                    <ListeDemandesSpecialesAdmin />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default PageAdmin;