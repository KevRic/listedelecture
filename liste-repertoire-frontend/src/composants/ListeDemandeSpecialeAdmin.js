import React, { Fragment, useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TrierDemandeSpeciale from '../composants/TrierDemandeSpeciales'


function ListeDemandesSpecialesAdmin() {

    const [demandesSpeciales, setListeDemandes] = useState([]);
    const [compteur, setCompteur] = useState(0); // mis un compteur car je ne veux pas que la liste se rafraichie losqu'ont tri les demandes ligne 33
    const [typeTridemande, setTridemande] = useState('Date');

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandespeciales`);
            const body = await resultat.json().catch((error) => { console.log(error) });

            if (typeTridemande === "NomClient" || typeTridemande === "Date") {
                const teste = body.sort((a, b) => b[typeTridemande] > a[typeTridemande] ? -1 : 1)
            }
            else if (typeTridemande === "NomClientDesc") {
                const teste = body.sort((a, b) => b[typeTridemande.substring(0, 9)] > a[typeTridemande.substring(0, 9)] ? 1 : -1);
            }
            else {
                const teste = body.sort((a, b) => b[typeTridemande.substring(0, 4)] > a[typeTridemande.substring(0, 4)] ? 1 : -1)
            }
            setListeDemandes(body);
        };
        chercherDonnees();
    }, [compteur]); 



    if (demandesSpeciales?.length) {

        function modifierEtatTrue(demandeSpeciale) {

            const envoyerFormulaire = async () => {
                await fetch(`/api/demandespeciales/modifier/${demandeSpeciale._id}`, {
                    method: 'put',
                    body: JSON.stringify({ NomClient: demandeSpeciale.NomClient, Etat: "true", Pieces: demandeSpeciale.Pieces }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            };
            setCompteur(compteur + 1);
            envoyerFormulaire();
        }

        function modifierEtatFalse(demandeSpeciale) {
            const envoyerFormulaire = async () => {
                await fetch(`/api/demandespeciales/modifier/${demandeSpeciale._id}`, {
                    method: 'put',
                    body: JSON.stringify({ NomClient: demandeSpeciale.NomClient, Etat: "false", Pieces: demandeSpeciale.Pieces }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            };
            setCompteur(compteur + 1);
            envoyerFormulaire();
        }


        return (
            <>

                <Row className="my-2">

                    <TrierDemandeSpeciale demandesSpeciales={demandesSpeciales} setListeDemandes={setListeDemandes} typeTridemande={typeTridemande} setTridemande={setTridemande} />
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
                                            <td><Button onClick={() => { demandeSpeciale.Etat !== "true" ? modifierEtatTrue(demandeSpeciale) : modifierEtatFalse(demandeSpeciale) }}>Etat Actif / Inactif</Button></td>
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

export default ListeDemandesSpecialesAdmin;



