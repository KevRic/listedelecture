import { React, useState, useEffect } from 'react';
import FormulaireAjouterDemandeSpeciale from '../composants/FormulaireAjouterDemandeSpeciale';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../Context/Auth';
import AfficherTrierPieces from '../composants/AfficherTrierPieces';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function PageAjouterDSClient() {
    const [etatButtonSoumettre, setEtatbuttonSoumettre] = useState(true);
    const [rediriger, setRediriger] = useState(false);
    const [listePieces, setListePieces] = useState([]);
    const [pieces, setPieces] = useState([]);
    const { IdUtilisateur } = UtiliseAUTH();
    const { nomUtilisateur } = UtiliseAUTH();
    const [typeTridemande, setTridemande] = useState('Artiste');
    const [motRechercher, setMotRechercher] = useState("");

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
            body: JSON.stringify({ IdUtilisateur: `${IdUtilisateur}`, NomClient: `${nomUtilisateur}`, Date: date, Pieces: piecesTemp }),
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
    if (typeTridemande === "ArtisteDesc" || typeTridemande === "TitreDesc") {
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
                            <h2 style={{ fontFamily: 'Rock' }}>Ajouter une nouvelle demande spéciale</h2>
                        </Alert>
                    </Col>
                    <Col className="text-right">
                        <Link to="/espaceClient">
                            <Button variant={'danger'}>Annuler</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <Button variant="primary" disabled={etatButtonSoumettre} onClick={envoyerFormulaire} >
                            Ajouter la demande spéciale
                        </Button>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col md="1">
                        <Form.Label>Recherche: </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Search" value={motRechercher} onChange={handleChange} />
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                        <AfficherTrierPieces setTridemande={setTridemande} />
                    </Col>
                </Row>
                <br />
                <FormulaireAjouterDemandeSpeciale listePieces={copyListePieces} setPieces={setPieces} pieces={pieces} setEtatbuttonSoumettre={setEtatbuttonSoumettre} typeTridemande={typeTridemande} />
            </Container>
        </>
    );
}

export default PageAjouterDSClient;