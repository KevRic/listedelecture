import {
    React,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col';

function TrierPiece({ listePieces, setListePieces, typeTripieces, settypeTripieces }) {

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
            const listTemp = listePieces.slice();
            var listTrier = undefined;
            if (typeTripieces === "ArtisteDesc" || typeTripieces === "TitreDesc") {
                listTrier = listTemp.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1);
            }
            else {
                listTrier = listTemp.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1);
            }
            setListePieces(listTrier);
        };
        triList(typeTripieces);
    }, [typeTripieces]);


    if (listePieces?.length) {

        return (<>


            <Col style={{ textAlign: 'right' }}>  Trier:
                        <select className="ml-2" onChange={(e) => settypeTripieces(e.target.value)}>
                    <option value="Titre">Titre</option>
                    <option value="Artiste">Artiste</option>
                    <option value="Categorie">Categorie</option>
                    <option value="TitreDesc">TitreDesc</option>
                    <option value="ArtisteDesc">ArtisteDesc</option>
                    <option value="CategorieDesc">CategorieDesc</option>
                </select>
            </Col>


        </>)






    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default TrierPiece;