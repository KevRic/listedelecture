import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ListeDemandesSpecialesClient({ demandesSpeciales }) {

    if (demandesSpeciales?.length) {
        return (
            <>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Demande Spéciale (Titre - Artiste)</th>
                            <th className="text-center">Modification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            demandesSpeciales.map((demandeSpeciale, key1) => {
                                return (
                                    <>
                                        <tr key={demandeSpeciale._id}>
                                            <td>{key1 + 1}</td>
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
                                                                    <td>{index + 1}</td>
                                                                    <td>{piece.Titre}</td>
                                                                    <td>{piece.Artiste}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </td>
                                            <td className="text-center">
                                                <Link to={`/modifierDemandeSpecialeClient/${demandeSpeciale._id}`}>
                                                    <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Vous n'avez pas de demandes spéciales.</Alert>;
    }
}

export default ListeDemandesSpecialesClient;