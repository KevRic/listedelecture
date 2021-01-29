import AfficherTrierDemandeSpeciale from './AfficherTrierDemandeSpeciale';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function AfficherDemandesSpecialesAdmin(props) {

    var demandesSpeciales = props.demandesSpeciales;

    const [typeTridemande, setTridemande] = useState('DateDesc');

    const types = {
        Date: 'Date',
        NomClient: 'NomClient',
        DateDesc: 'Date',
        NomClientDesc: 'NomClient'
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
        envoyerFormulaire();
        props.setCompteur(props.compteur + 1);
        
    }


    function EtatContraire(etat) {

        var etatTexte = etat;

        if (etatTexte !== "true") {
            etatTexte = "Activer";
        }
        else {
            etatTexte = "Désactiver"
        }

        return etatTexte;
    }

    function CouleurButton(etat) {

        var etatCouleur = etat;

        if (etatCouleur !== "true") {
            etatCouleur = "success";
        }
        else {
            etatCouleur = "danger"
        }

        return etatCouleur;
    }

    if (demandesSpeciales?.length) {

        return (
            <>
                <Row className="my-2">
                    <Col style={{ textAlign: 'right' }}>
                        <AfficherTrierDemandeSpeciale setTridemande={setTridemande} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Date</th>
                                    <th>Etat</th>
                                    <th>Demande spéciale (Titre - Artiste)</th>
                                    <th>Manipulation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demandesSpeciales.map((demandeSpeciale, key) => {
                                    return (
                                        <tr key={demandeSpeciale._id}>
                                            <td>{demandeSpeciale.NomClient}</td>
                                            <td>{demandeSpeciale.Date}</td>
                                            <td>{demandeSpeciale.Etat}</td>
                                            <td>
                                                <Table bordered striped>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Titre</th>
                                                            <th>Artiste</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            demandeSpeciale.Pieces.map((piece, index) =>
                                                                <tr key={index}>
                                                                    <td >{index + 1}</td>
                                                                    <td >{piece.Titre}</td>
                                                                    <td >{piece.Artiste}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </td >
                                            <td className="text-center"><Button variant={CouleurButton(demandeSpeciale.Etat)} onClick={() => modifierEtat(demandeSpeciale)}>{EtatContraire(demandeSpeciale.Etat)}</Button></td>
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
