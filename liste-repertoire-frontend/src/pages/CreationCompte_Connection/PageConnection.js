import { React, useState } from 'react';
import { Alert, Container, Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UtiliseAUTH } from '../../Context/Auth';
import FormulaireConnectionAdmin from '../../composants/Formulaires/Connection/FormulaireConnectionAdmin';
import FormulaireConnectionUtilisateur from '../../composants/Formulaires/Connection/FormulaireConnectionUtilisateur';

function PageConnection() {

    const { authentificationUtilisateur } = UtiliseAUTH();
    const { authentificationAdmin } = UtiliseAUTH();
    const [rediriger, setRediriger] = useState("");

    function AfficherRedirection() {
        if (rediriger === "espaceClient" || rediriger === "admin") {
            return <Redirect to={rediriger} />
        }
    }

    function VerifierAuthentificationClient() {

        if (!authentificationUtilisateur && authentificationAdmin) {
            return (
                <Alert variant={"danger"}>Vous n'avez pas le droit d'accéder à la page espace client </Alert>
            )
        }
        else if (authentificationUtilisateur && !authentificationAdmin) {
            return (
                <Alert variant={"danger"}>Vous n'avez pas le droit d'accéder à la page admin </Alert>
            )
        }
        else {
            return (
                <>
                    <Alert variant={"info"}>Connectez vous !!! </Alert>
                    <div >
                        <Tabs transition={false} id="choixFormulaire">
                            <Tab eventKey="utilisateur" title="Client">
                                <Alert variant={"info mt-4 mb-4"}> Page de connection client </Alert>
                                <FormulaireConnectionUtilisateur setRediriger={setRediriger} />
                            </Tab>
                            <Tab eventKey="admin" title="Admin">
                                <Alert variant={"info mt-4 mb-4"}> Page connection admin  </Alert>
                                <FormulaireConnectionAdmin setRediriger={setRediriger} />
                            </Tab>
                        </Tabs>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Container>
                <VerifierAuthentificationClient />
            </Container>
        </>
    );
}

export default PageConnection;