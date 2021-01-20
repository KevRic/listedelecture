import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ListeDemandesSpecialesClient({ demandesSpeciales }) {

    if (demandesSpeciales?.length) {

        return (
            <>
                {demandesSpeciales.map((demandeSpeciale, key) => {
                    return (
                        <div key={demandeSpeciale.NomClient}>
                            <h4>Demande {key + 1}</h4>
                            
                            {
                                <ul>{
                                    demandeSpeciale.Pieces.map(piece =>
                                        
                                        <li key={piece._id}>
                                            {piece.Titre} - {piece.Artiste}
                                        </li>
                                    )}
                                    <Link to={`/modifierDemandeSpecialeClient/${demandeSpeciale._id}`}>
                                        <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                    </Link>
                                </ul>
                            }
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Vous n'avez pas de demandes spéciales.</Alert>;
    }
}

export default ListeDemandesSpecialesClient;