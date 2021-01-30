import { React, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ListePieces from '../composants/ListePieces';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import AfficherTrierPieces from '../composants/AfficherTrierPieces';

function PageRepertoire() {
    const [listePieces, setListePieces] = useState([]);
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

    function AffichageComposant() {
        if (listePieces?.length) {
            return (
                <>
                    <Row className="my-2">
                        <Col md="1">
                            <Form.Label>Recherche: </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Search" value={motRechercher} onChange={handleChange} />
                        </Col>
                        <Col className="text-right">
                            <AfficherTrierPieces setTridemande={setTridemande} />
                        </Col>
                    </Row>
                    <br />
                    <h2 style={{ fontFamily: 'Rock' }}>Voici la liste des pièces</h2>
                    <ListePieces listePieces={copyListePieces} typeTridemande={typeTridemande} />
                </>
            )
        }
        else {
            return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md="auto">
                    <Alert variant="dark">
                        <h1>Liste du répertoire</h1>
                    </Alert>
                </Col>
            </Row>
            <AffichageComposant />
        </Container>
    );
}

export default PageRepertoire;