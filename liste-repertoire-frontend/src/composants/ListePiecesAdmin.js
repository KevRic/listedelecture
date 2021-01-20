import React from 'react';
import Alert from 'react-bootstrap/Alert'
import ListePiecesTrieParTitreOuArtiste  from './ListePiecesTrieParTitreOuArtiste';
import ListePiecesTrieParCategorie from './ListePiecesTrieParCategorie';

function ListePiecesAdmin({ pieces,typeTri }) {
    if (pieces?.length) {

        if(typeTri === "Categorie" || typeTri === "CategorieDesc" )
        {
            return(
                <ListePiecesTrieParCategorie listePieces={pieces} typeTri={typeTri} />       
            );
        }
        else{

            return(
                <ListePiecesTrieParTitreOuArtiste listePieces={pieces} />
            );
        }           
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePiecesAdmin;