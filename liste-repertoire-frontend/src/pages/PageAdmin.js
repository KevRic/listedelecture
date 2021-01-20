import {
    React,
    useState,
    useEffect
} from 'react';
import Col from 'react-bootstrap/Col';
import ListePiecesAdmin from '../composants/ListePiecesAdmin';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function PageAdmin() {
    const [listePieces, setListePieces] = useState([]);
    const [typeTri, setTypeTri] = useState('Titre');



    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    useEffect(() => {
        const triList = type => {
            const types = {
                Titre: 'Titre',
                Artiste: 'Artiste',
                TitreDesc: 'Titre',
                ArtisteDesc: 'Artiste',
                Categorie: 'Titre',
                CategorieDesc: 'Titre',
            };
            const proprieteTri = types[type];
            console.log(proprieteTri);
            const test = listePieces.slice();
            var listTrier = undefined;
            if (typeTri === "ArtisteDesc" || typeTri === "TitreDesc") {
                listTrier = test.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1);
            }
            else {
                listTrier = test.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1);
            }

            console.log(listTrier);
            setListePieces(listTrier);
        };

        triList(typeTri);
    }, [typeTri]);



    return (
        <>
            <Alert variant={"warning"} className="mt-3">
                <h1>Page administrateur</h1>
            </Alert>


            <Row className="mb-2">
                <Col>
                    <Link to="/ajouter">
                        <Button>Ajouter une nouvelle pièce</Button>
                    </Link>
                </Col>
                <Col style={{ textAlign: 'right' }}>  Trier:
        <select className="ml-2" onChange={(e) => setTypeTri(e.target.value)}>
                        <option value="Titre">Titre</option>
                        <option value="Artiste">Artiste</option>
                        <option value="Categorie">Categorie</option>
                        <option value="TitreDesc">TitreDesc</option>
                        <option value="ArtisteDesc">ArtisteDesc</option>
                        <option value="CategorieDesc">CategorieDesc</option>
                    </select>
                </Col>


            </Row>

            <ListePiecesAdmin pieces={listePieces} typeTri={typeTri} />
        </>
    );
}

export default PageAdmin;