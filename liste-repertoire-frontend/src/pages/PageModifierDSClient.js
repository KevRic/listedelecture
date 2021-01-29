import FormulaireModifierDemandeSpeciale from '../composants/FormulaireModifierDemandeSpeciale';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PageModifierDSClient({ match }) {

    const id = match.params.id;
    const [pieces, setPieces] = useState([]);
    const [rediriger, setRediriger] = useState(false);
    const [etatButtonSoumettre, setEtatbuttonSoumettre] = useState(true);
    const [listePieces, setListePieces] = useState([]);
    const [piecesDebutModification, setPiecesDebutModification] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandespeciales/${id}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setPieces(body.Pieces);
            setPiecesDebutModification(body.Pieces);
        };
        chercherDonnees();

    }, [id]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            body.forEach(piece => delete piece._id);
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    const envoyerFormulaire = async () => {
        console.log(pieces);
        await fetch(`/api/demandespeciales/modifier/${id}`, {
            method: 'put',
            body: JSON.stringify({ Etat: true, Pieces: pieces }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    // useEffect(() => {
    //     const test = () => {
    //         if (artiste.length > 1 && titre.length > 1 && categorieArray.length > 0) {
    //             setEtatbuttonSoumettre(false);
    //         }
    //         else {
    //             setEtatbuttonSoumettre(true);
    //         }
    //     }
    //     test();
    // }, [titre, artiste, categorieArray])

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }


    return (
        <>
            {AfficherRedirection()}

            <Row>
                <Col md="auto"><h2>Modifier votre demande spéciale</h2></Col>
                <Col>
                    <Button variant="primary" disabled={etatButtonSoumettre} onClick={envoyerFormulaire} >
                        Modifier la demande spéciale
                    </Button>
                </Col>
                <Col className="text-right">
                    <Link to="/espaceClient">
                        <Button variant={'danger'}>Annuler</Button>
                    </Link>
                </Col>
            </Row>
            <br />
            <FormulaireModifierDemandeSpeciale listePieces={listePieces} setPieces={setPieces} pieces={pieces} setEtatbuttonSoumettre={setEtatbuttonSoumettre} piecesDebutModification={piecesDebutModification} />
        </>
    );
}

export default PageModifierDSClient;