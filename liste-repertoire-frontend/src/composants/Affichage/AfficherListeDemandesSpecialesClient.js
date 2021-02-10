import React from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AfficherListeDemandesSpecialesClient({ demandesSpeciales }) {

    const { t } = useTranslation();

    if (demandesSpeciales?.length) {
        return (
            <>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th >#</th>
                            <th >{t('demandespecialetitreartiste')}</th>
                            <th className="text-center">{t('manipulation')}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            demandesSpeciales.map((demandeSpeciale, key1) => {
                                return (
                                    <tr key={demandeSpeciale._id}>
                                        <td>{key1 + 1}</td>
                                        <td>
                                            <Table bordered striped>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>{t('titre')}</th>
                                                        <th>{t('artiste')}</th>
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
                                                <Button variant="success" className="m-1" size="sm" >{t('modifier')}</Button>
                                            </Link>
                                        </td>
                                    </tr>
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

export default AfficherListeDemandesSpecialesClient;