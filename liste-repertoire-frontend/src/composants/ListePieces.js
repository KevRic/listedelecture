import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListePieces({ pieces }) {
    
    if (pieces?.length) {
        var dictionnaireCategories = Object();

        pieces.forEach(piece => {
            piece.Categorie.map(cat => {
                if (dictionnaireCategories[cat] === undefined) {
                    dictionnaireCategories[cat] = true;
                }
            })
        });

        const categories = Object.keys(dictionnaireCategories);
        
        return (
            <>
                {categories.map((categorie) => {
                    const piecesAssociees = pieces.filter((piece) => piece.Categorie.includes(categorie));
                    return (
                        <div key={categorie}>
                            <h4>{categorie}</h4>
                            <ul>
                                {
                                    piecesAssociees.map(piece => <li key={piece._id}>{piece.Titre} - {piece.Artiste}</li>)
                                }
                            </ul>
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePieces;