import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import AfficherListePiecesAdmin from '../composants/AfficherListePiecesAdmin'


function ListePiecesAdmin() {

    const [listePieces, setListePieces] = useState([]);


    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);


   
    if (listePieces?.length) {
        
        return (<>

    <AfficherListePiecesAdmin listePieces={listePieces} />
        </>)
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePiecesAdmin;