import AfficherTrierDemandeSpeciale from './AfficherTrierDemandeSpeciale';
import React, { Fragment, useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';




function AfficherDemandesSpecialesAdmin(props) {

    var demandesSpeciales = props.demandesSpeciales.slice();

    const [typeTridemande, setTridemande] = useState('Date');

    const types = {
        Date: 'Date',
        NomClient: 'NomClient',
        DateDesc: 'Date',
        NomClientDesc: 'NomClient',
    };
    const proprieteTri = types[typeTridemande];
    if (typeTridemande === "NomClient" || typeTridemande === "Date") {
        demandesSpeciales.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1)
    }
    else {
        demandesSpeciales.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1)
    }


    function modifierEtat(demandeSpeciale) {

        var etat = demandeSpeciale.Etat;

        if (etat !== "true") {
            etat = "true";
        }
        else {
            etat = "false"
        }
        const envoyerFormulaire = async () => {
            await fetch(`/api/demandespeciales/modifier/${demandeSpeciale._id}`, {
                method: 'put',
                body: JSON.stringify({ NomClient: demandeSpeciale.NomClient, Etat: etat, Pieces: demandeSpeciale.Pieces }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        };
        props.setCompteur(props.compteur + 1);
        envoyerFormulaire();
    }




    if (demandesSpeciales?.length) {

        return (
            <>
                <Row className="my-2">
                    <AfficherTrierDemandeSpeciale setTridemande={setTridemande} />
                    
                </Row>
                <Row>
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
                                            <td><Button onClick={() => modifierEtat(demandeSpeciale)}>Etat Actif / Inactif</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>




 
            </>
        );


    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de demandes spéciales.</Alert>;
    }
}

export default AfficherDemandesSpecialesAdmin;
