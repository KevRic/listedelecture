import React from 'react';
import { Alert, Tabs, Tab, Container } from 'react-bootstrap';
import ListePiecesAdmin from '../../composants/ListePiecesAdmin';
import ListeDemandesSpecialesAdmin from '../../composants/ListeDemandeSpecialeAdmin';
import { useTranslation } from 'react-i18next';

function PageAdmin() {
    const { t } = useTranslation();
    return (
        <Container fluid>
            <Alert variant={"dark"} className="mt-3">
                <h1>{t('pageadministrateur.titre')}</h1>
            </Alert>

            <Tabs transition={false} id="choixTabadministrateur">
                <Tab eventKey="admin" title={t('pageadministrateur.manipulationpieces')}>
                    <ListePiecesAdmin />
                </Tab>

                <Tab eventKey="tabManipulationdemande" title={t('pageadministrateur.manipulationdemandesspeciales')}>
                    <ListeDemandesSpecialesAdmin />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default PageAdmin;