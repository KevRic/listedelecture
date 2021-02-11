import { React, useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import AfficherTrierPieces from '../../composants/Affichage/AfficherTrierPieces';
import FormulaireModifierDemandeSpeciale from '../../composants/Formulaires/DemandeSpeciale/FormulaireModifierDemandeSpeciale';
import { useTranslation } from 'react-i18next';

function PageModifierDSClient({ match }) {
    const { t } = useTranslation();
    const id = match.params.id;
    const [pieces, setPieces] = useState([]);
    const [rediriger, setRediriger] = useState(false);
    const [etatButtonSoumettre, setEtatbuttonSoumettre] = useState(true);
    const [listePieces, setListePieces] = useState([]);
    const [piecesDebutModification, setPiecesDebutModification] = useState([]);
    const [typeTridemande, setTridemande] = useState('Artiste');
    const [motRechercher, setMotRechercher] = useState("");

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

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }

    var copyListePieces = listePieces.slice();

    const handleChange = event => {
        setMotRechercher(event.target.value);
    };

    // fonction rechercher
    var motRechercherLC = motRechercher.toLowerCase();
    copyListePieces = copyListePieces.filter(piece =>
        piece.Titre.toLowerCase().includes(motRechercherLC) || piece.Artiste.toLowerCase().includes(motRechercherLC) ||
        piece.Categorie.find(categorie => categorie.toLowerCase().includes(motRechercherLC))
    );

    const types = {
        Titre: 'Titre',
        Artiste: 'Artiste',
        TitreDesc: 'Titre',
        ArtisteDesc: 'Artiste',
        Categorie: 'Titre',
        CategorieDesc: 'Titre',
    };


    const proprieteTri = types[typeTridemande];
    if (typeTridemande === "ArtisteDesc" || typeTridemande === "Titre") {
        copyListePieces.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1);
    }
    else {
        copyListePieces.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1);
    }


    return (
        <>
            {AfficherRedirection()}
            <Container fluid>
                <Row>
                    <Col md="auto">
                        <Alert variant="dark">
                            <h2 style={{ fontFamily: 'Rock' }}>{t('pagemodifierDS.titre')}</h2>
                        </Alert>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" disabled={etatButtonSoumettre} onClick={envoyerFormulaire} >
                        {t('bouton.modifierdemandespeciale')}
                        </Button>
                    </Col>
                    <Col className="text-right">
                        <Link to="/espaceClient">
                            <Button variant={'danger'}>{t('bouton.annuler')}</Button>
                        </Link>
                    </Col>
                </Row>
                <br />
                <Row className="my-2">
                    <Col md="1">
                        <Form.Label>{t('rechercher')}:</Form.Label>
                    </Col>
                    <Col className="text-left">
                        <Form.Control type="text" placeholder={t('rechercher')} value={motRechercher} onChange={handleChange} />
                    </Col>
                    <Col className="text-right">
                        <AfficherTrierPieces setTridemande={setTridemande} />
                    </Col>
                </Row>
                <br />
                <FormulaireModifierDemandeSpeciale listePieces={copyListePieces} setPieces={setPieces} pieces={pieces} setEtatbuttonSoumettre={setEtatbuttonSoumettre} piecesDebutModification={piecesDebutModification} typeTridemande={typeTridemande} />
            </Container>
        </>
    );
}

export default PageModifierDSClient;