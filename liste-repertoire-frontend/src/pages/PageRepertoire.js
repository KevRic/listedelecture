import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import ListePieces from '../composants/ListePieces';

function PageRepertoire() {
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (

        <Container fluid>

            <Alert variant="dark">
                <h1>Liste du répertoire</h1>
            </Alert>
            <ListePieces pieces={listePieces} />
        </Container>


    );
}

export default PageRepertoire;