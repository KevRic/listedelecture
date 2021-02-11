import { React, useState, useEffect } from 'react';
import { Form, Container, Col, Row, Alert } from 'react-bootstrap';
import AfficherTrierPieces from '../composants/Affichage/AfficherTrierPieces';
import AfficherListePiecesRepertoireTrieParCategorie from '../composants/Affichage/AfficherListePiecesRepertoireTrieParCategorie';
import AfficherListePiecesRepertoireTrieParTitreOuArtiste from '../composants/Affichage/AfficheListePiecesRepertoireTrieParTitreOuArtiste';
import { useTranslation } from 'react-i18next';

function PageRepertoire() {
    const { t } = useTranslation();
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
    if (typeTridemande === "ArtisteDesc" || typeTridemande === "TitreDesc") {
        copyListePieces.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1);
    }
    else {
        copyListePieces.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1);
    }

    function MiseAJourAffichage() {

        if (typeTridemande === "Categorie" || typeTridemande === "CategorieDesc") {
            return (
                <AfficherListePiecesRepertoireTrieParCategorie listePieces={copyListePieces} typeTridemande={typeTridemande} />
            );
        }
        else {
            return (
                <AfficherListePiecesRepertoireTrieParTitreOuArtiste listePieces={copyListePieces} />
            );
        }
    }


    
    function AffichageComposant() {
        if (listePieces?.length) {
            return (
                <>
                    <Row className="my-2">
                        <Col>
                            <Form.Label >{t('rechercher')}:</Form.Label>
                            <Form.Control autoFocus type="text" placeholder={t('rechercher')} value={motRechercher} onChange={handleChange} />
                        </Col>
                        <Col></Col>
                        <Col className="text-right">
                            <AfficherTrierPieces typeTridemande={typeTridemande} setTridemande={setTridemande} />
                        </Col>
                    </Row>
                    <br />
                    <h2 style={{ fontFamily: 'Rock' }}>{t('pagerepertoire.titre2')}</h2>
                    {MiseAJourAffichage()}
                </>
            )
        }
        else {
            return <Alert variant={"info"} >{t('pagerepertoire.pasdepiecesrepertoire')}</Alert>;
        }
    }

    return (
        <Container fluid>
            <Alert variant="dark">
                <h1>{t('pagerepertoire.titre')}</h1>
            </Alert>
            <AffichageComposant />
        </Container>
    );
}

export default PageRepertoire;