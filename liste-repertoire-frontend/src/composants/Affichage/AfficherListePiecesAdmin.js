import { React, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AfficherTrierPieces from './AfficherTrierPieces';
import AfficherListePiecesTrieParCategorie from './AfficherListePiecesTrieParCategorie';
import AfficherListePiecesTrieParTitreOuArtiste from './AfficherListePiecesTrieParTitreOuArtiste';


function AfficherListePiecesAdmin(props) {

    const [typeTridemande, setTridemande] = useState('Date');
    var copyListePieces = props.listePieces.slice();
    const [motRechercher, setMotRechercher] = useState("");

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

    function MiseAJourAffichage() {

        if (typeTridemande === "Categorie" || typeTridemande === "CategorieDesc") {
            return (
                <AfficherListePiecesTrieParCategorie listePieces={copyListePieces} typeTridemande={typeTridemande} />
            );
        }
        else {
            return (
                <AfficherListePiecesTrieParTitreOuArtiste listePieces={copyListePieces} />
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
                    <AfficherTrierPieces typeTridemande={typeTridemande} setTridemande={setTridemande} />
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



