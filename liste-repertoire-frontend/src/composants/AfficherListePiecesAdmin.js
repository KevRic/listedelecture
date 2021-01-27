import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AfficherTrierPieces from './AfficherTrierPieces';
import ListePiecesTrieParCategorie from '../composants/ListePiecesTrieParCategorie';
import ListePiecesTrieParTitreOuArtiste from '../composants/ListePiecesTrieParTitreOuArtiste';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';


function AfficherListePiecesAdmin(props) {


    const [typeTridemande, setTridemande] = useState('Date');

    var copyListePieces = props.listePieces.slice();

    const [motRechercher, setMotRechercher] = useState("");

    const handleChange = event => {
        setMotRechercher(event.target.value);
    };


    copyListePieces = copyListePieces.filter(piece =>
        piece.Titre.includes(motRechercher) || piece.Artiste.includes(motRechercher) ||
        piece.Categorie.includes(motRechercher)
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


    function MiseAJourAffichage() {

        if (typeTridemande === "Categorie" || typeTridemande === "CategorieDesc") {
            return (
                <>
                    <ListePiecesTrieParCategorie listePieces={copyListePieces} typeTridemande={typeTridemande} />
                </>
            );
        }
        else {

            return (
                <ListePiecesTrieParTitreOuArtiste listePieces={copyListePieces} />
            );
        }
    }


    return (
        <>
            <Row className="my-2 ">
                <Col>
                    <Form.Label>Recherche:</Form.Label>
                    <Form.Control type="text" placeholder="Search" value={motRechercher} onChange={handleChange} />
                </Col>
                <Col></Col>
                <Col style={{ textAlign: 'right' }}>
                    <AfficherTrierPieces setTridemande={setTridemande} />
                    <Link to="/ajouter">
                        <Button className="mt-2">Ajouter une nouvelle pièce</Button>
                    </Link>
                </Col>
            </Row>
            {MiseAJourAffichage()}
        </>
    );

}

export default AfficherListePiecesAdmin;