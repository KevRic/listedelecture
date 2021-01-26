import {React} from 'react';
import Col from 'react-bootstrap/Col';

function AfficherTrierPieces(props) {

        return (<>


            <Col style={{ textAlign: 'right' }}>  Trier:
                        <select className="ml-2" onChange={(e) => props.setTridemande(e.target.value)}>
                    <option value="Artiste">Artiste</option>
                    <option value="Titre">Titre</option>
                    <option value="Categorie">Categorie</option>
                    <option value="TitreDesc">TitreDesc</option>
                    <option value="ArtisteDesc">ArtisteDesc</option>
                    <option value="CategorieDesc">CategorieDesc</option>
                </select>
            </Col>
        </>)  
}

export default AfficherTrierPieces;