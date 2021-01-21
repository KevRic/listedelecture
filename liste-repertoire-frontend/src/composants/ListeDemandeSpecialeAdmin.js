import React, { Fragment, useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function ListeDemandesSpecialesAdmin({ demandesSpeciales , setTest }) {


    const [compteur, setCompteur] = useState(0);

    if (demandesSpeciales?.length) {

        function modifierEtatTrue(demandeSpeciale){
           
            const envoyerFormulaire = async () => {
                await fetch(`/api/demandespeciales/modifier/${demandeSpeciale._id}`, {
                    method: 'put',
                    body: JSON.stringify({ NomClient: demandeSpeciale.NomClient, Etat: "true", Pieces: demandeSpeciale.Pieces }),       
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
               
            };
            setCompteur(compteur +1);
            setTest(compteur);
            envoyerFormulaire();
        }

        function modifierEtatFalse(demandeSpeciale){
            console.log(demandeSpeciale.Etat);
            console.log(demandeSpeciale.NomClient);
            console.log(demandeSpeciale._id);
            const envoyerFormulaire = async () => {
                await fetch(`/api/demandespeciales/modifier/${demandeSpeciale._id}`, {
                    method: 'put',
                    body: JSON.stringify({ NomClient: demandeSpeciale.NomClient, Etat: "false", Pieces: demandeSpeciale.Pieces }),       
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
              
            };
            setCompteur(compteur +1);
            setTest(compteur);
            envoyerFormulaire();
        }

       
        return (
            
            <Row className="mt-2">
                <Col>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Date</th>
                                <th>Etat</th>
                                <th>Titre</th>
                                <th>Artiste</th>
                                <th>Manipulation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandesSpeciales.map((demandeSpeciale, key) => {
                            return (
                                <tr key={demandeSpeciale.NomClient}>
                                    <td>{demandeSpeciale.NomClient}</td>
                                    <td>{demandeSpeciale.Date}</td>
                                    <td>{demandeSpeciale.Etat}</td>
                                    
                                        <>{
                                            demandeSpeciale.Pieces.map(piece => {
                                                return (
                                                <Fragment>
                                                    <td key={piece}>{piece.Titre}</td>
                                                    <td> {piece.Artiste}</td>
                                               </Fragment>
                                                   
                                                );
                                            }
                                            )}
                                        </>  

                                     <td><Button onClick={() => {demandeSpeciale.Etat !== "true" ? modifierEtatTrue(demandeSpeciale) : modifierEtatFalse(demandeSpeciale)}}>Etat Actif / Inactif</Button></td>                                 
                                </tr>
                            )
                        })}
                        </tbody>
                     </Table>
                 </Col>
             </Row>
        
        );
        
        
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de demandes spéciales.</Alert>;
    }
}

export default ListeDemandesSpecialesAdmin;



