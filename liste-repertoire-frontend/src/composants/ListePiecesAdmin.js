import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import ListePiecesTrieParTitreOuArtiste from './ListePiecesTrieParTitreOuArtiste';
import ListePiecesTrieParCategorie from './ListePiecesTrieParCategorie';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TrierPiece from "../composants/TrierPiece";


function ListePiecesAdmin() {


    const [listePieces, setListePieces] = useState([]);
    const [typeTripieces, settypeTripieces] = useState('Titre');


    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);


    function MiseAJourAffichage() {

        if (typeTripieces === "Categorie" || typeTripieces === "CategorieDesc") {
            return (
                <>
                    <ListePiecesTrieParCategorie listePieces={listePieces} typeTri={typeTripieces} />
                </>
            );
        }
        else {

            return (
                <ListePiecesTrieParTitreOuArtiste listePieces={listePieces} />
            );
        }
    }

    if (listePieces?.length) {
        console.log(typeTripieces);

        return (<>

            <Row className="my-2 ">
                <Col>
                    <Link to="/ajouter">
                        <Button>Ajouter une nouvelle pièce</Button>
                    </Link>
                </Col>
                <TrierPiece listePieces={listePieces} setListePieces={setListePieces} typeTripieces={typeTripieces} settypeTripieces={settypeTripieces} />
            </Row>
            {MiseAJourAffichage()}
        </>)
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePiecesAdmin;