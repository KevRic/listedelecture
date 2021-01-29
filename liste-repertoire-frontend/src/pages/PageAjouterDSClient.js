import { React, useState, useEffect } from 'react';
import FormulaireAjouterDemandeSpeciale from '../composants/FormulaireAjouterDemandeSpeciale';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../Context/Auth';

function PageAjouterDSClient() {
    const [etatButtonSoumettre, setEtatbuttonSoumettre] = useState(true);
    const [rediriger, setRediriger] = useState(false);
    const [listePieces, setListePieces] = useState([]);
    const [pieces, setPieces] = useState([]);
    const { authentification } = UtiliseAUTH();

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    const envoyerFormulaire = async () => {
        const date = new Date().toUTCString();

        var piecesTemp = pieces.slice();
        piecesTemp.map(piece => delete piece._id);

        await fetch(`/api/demandespeciales/ajouter`, {
            method: 'post',
            body: JSON.stringify({ IdUtilisateur: `${authentification.id}`, NomClient: `${authentification.utilisateur}`, Date: date, Pieces: piecesTemp }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Row>
                <Col md="auto"><h2>Ajouter une nouvelle demande spéciale</h2></Col>
                <Col>
                    <Button variant="primary" disabled={etatButtonSoumettre} onClick={envoyerFormulaire} >
                        Ajouter la demande spéciale
                    </Button>
                </Col>
                <Col className="text-right">
                    <Link to="/espaceClient">
                        <Button variant={'danger'}>Annuler</Button>
                    </Link>
                </Col>
            </Row>
            <br />
            <FormulaireAjouterDemandeSpeciale listePieces={listePieces} setPieces={setPieces} pieces={pieces} setEtatbuttonSoumettre={setEtatbuttonSoumettre}/>

        </>
    );
}

export default PageAjouterDSClient;