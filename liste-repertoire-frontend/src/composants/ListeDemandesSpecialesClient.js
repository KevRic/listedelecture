import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ListeDemandesSpecialesClient({ demandesSpeciales }) {

    if (demandesSpeciales?.length) {
        return (
            <>
                <Table bordered striped key={demandesSpeciales}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Demande Spéciale (Titre - Artiste)</th>
                            <th className="text-center">Modification</th>
                        </tr>
                    </thead>

                    <tbody>
                        {demandesSpeciales.map((demandeSpeciale, index1) => {
                            return (
                                <>
                                    <tr key={index1}>
                                        <td key={index1 + 1}>{index1 + 1}</td>
                                        <td key={demandeSpeciale.Pieces}>
                                            <Table bordered striped key={demandeSpeciale}>
                                                <thead>
                                                    <tr key={demandeSpeciale._id}>
                                                        <th key={index1}>#</th>
                                                        <th key={demandeSpeciale.Pieces.Titre}>Titre</th>
                                                        <th key={demandeSpeciale.Pieces.Artiste}>Artiste</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        demandeSpeciale.Pieces.map((piece, index) =>
                                                            <tr key={index}>
                                                                <td key={index + 1}>{index + 1}</td>
                                                                <td key={piece.Titre}>{piece.Titre}</td>
                                                                <td key={piece.Artiste}>{piece.Artiste}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </td>
                                        <td className="text-center" key={demandeSpeciale._id}>
                                            <Link to={`/modifierDemandeSpecialeClient/${demandeSpeciale._id}`}>
                                                <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
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