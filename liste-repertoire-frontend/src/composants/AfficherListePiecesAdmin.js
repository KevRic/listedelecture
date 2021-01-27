import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AfficherTrierPieces from './AfficherTrierPieces';
import ListePiecesTrieParCategorie from '../composants/ListePiecesTrieParCategorie';
import ListePiecesTrieParTitreOuArtiste from '../composants/ListePiecesTrieParTitreOuArtiste';
import { Link } from 'react-router-dom';


function AfficherListePiecesAdmin(props) {


    const [typeTridemande, setTridemande] = useState('Date');

    var copyListePieces = props.listePieces.slice();

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
                    <Link to="/ajouter">
                        <Button>Ajouter une nouvelle pièce</Button>
                    </Link>
                </Col>
                <AfficherTrierPieces setTridemande={setTridemande} />
            </Row>
            {MiseAJourAffichage()}
        </>
    );



}

export default AfficherListePiecesAdmin;