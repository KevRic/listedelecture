import { React, useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../../Context/Auth';
import { useTranslation } from 'react-i18next';

function PageProfile() {
    const { t } = useTranslation();
    const { IdUtilisateur } = UtiliseAUTH();
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/utilisateurs/${IdUtilisateur}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setPrenom(body.Prenom);
            setNom(body.Nom);
            setEmail(body.Email);
        };
        chercherDonnees();
    }, [IdUtilisateur]);

    return (
        <Container fluid>
            <div className="mb-2">
                <Link to={`/PageModifierProfile/${IdUtilisateur}`}>
                    <Button variant="success">{t('bouton.modifier')}</Button>
                </Link>
            </div>

            <Alert variant={"success"}>
            {t('pageutilisateur.nom')} :   <h2> {nom}</h2>
            {t('pageutilisateur.prenom')} :  <h2>{prenom}</h2>
            {t('pageutilisateur.email')} :  <h2> {email}</h2>
            </Alert>
        </Container>
    )
}

export default PageProfile;