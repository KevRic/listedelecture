import { React, useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AfficherListePiecesAdmin from '../composants/Affichage/AfficherListePiecesAdmin';
import { useTranslation } from 'react-i18next';

function ListePiecesAdmin() {
    const { t } = useTranslation();
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    if (listePieces?.length) {
        return (
            <AfficherListePiecesAdmin listePieces={listePieces} />
        )
    }
    else {
        return (
            <>
                <Alert variant={"info"} >{t('pageadministrateur.pasdepiecesrepertoire')}</Alert>
                <Link to="/ajouter">
                    <Button className="mt-2">{t('bouton.ajouternouvellepiece')}</Button>
                </Link>
            </>
        );
    }
}

export default ListePiecesAdmin;