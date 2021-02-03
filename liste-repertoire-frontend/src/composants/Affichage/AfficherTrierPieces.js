import { React } from 'react';

function AfficherTrierPieces(props) {

        return (
                <>
                        Trier:
                        <select className="ml-2" onChange={(e) => props.setTridemande(e.target.value)}>
                                <option value="Artiste">Artiste</option>
                                <option value="Titre">Titre</option>
                                <option value="Categorie">Categorie</option>
                                <option value="TitreDesc">TitreDesc</option>
                                <option value="ArtisteDesc">ArtisteDesc</option>
                                <option value="CategorieDesc">CategorieDesc</option>
                        </select>
                </>
        )
}

export default AfficherTrierPieces;