import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListeDemandesSpecialesAdmin({ demandesSpeciales }) {

    if (demandesSpeciales?.length) {

        return (
            <>
                {demandesSpeciales.map((demandeSpeciale, key) => {
                    return (
                        <div key={demandeSpeciale.NomClient}>
                            <h4>Demande {key + 1}</h4>
                            <p> <b>Nom du Client :</b> {demandeSpeciale.NomClient}</p>
                            {
                                <ul>{
                                    demandeSpeciale.Pieces.map(piece => {
                                        return (
                                            <li key={piece}><b>Titre/ Artiste :</b> {piece.Titre} - {piece.Artiste}</li>
                                        );
                                    }
                                    )}
                                </ul>
                            }
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de demandes spéciales.</Alert>;
    }
}

export default ListeDemandesSpecialesAdmin;