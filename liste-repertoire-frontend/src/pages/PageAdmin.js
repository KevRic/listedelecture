import React from 'react';
import ListePiecesAdmin from '../composants/ListePiecesAdmin';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import ListeDemandesSpecialesAdmin from '../composants/ListeDemandeSpecialeAdmin';
import Container from 'react-bootstrap/Container';


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