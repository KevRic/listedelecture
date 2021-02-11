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
                            <th >{t('pageespaceclient.titredemandespeciale')}</th>
                            <th className="text-center">{t('pageespaceclient.titremodification')}</th>
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
                                                        <th>{t('piece.titre')}</th>
                                                        <th>{t('piece.artiste')}</th>
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
                                                <Button variant="success" className="m-1" size="sm" >{t('bouton.modifier')}</Button>
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
        return <Alert variant={"info"} >{t('pageespaceclient.pasdedemandesspeciales')}</Alert>;
    }
}

export default AfficherListeDemandesSpecialesClient;