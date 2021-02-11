import { React, useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageSupprimerPiece({ match }) {
    const { t } = useTranslation();
    const id = match.params.id;
    const [rediriger, setRediriger] = useState(false);

    const confirmerSuppression = async () => {
        await fetch(`/api/pieces/supprimer/${id}`, {
            method: 'delete',
        });

        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    return (
        <Container>
            {AfficherRedirection()}
            <h1>{t('pageadministrateur.titresupprimerpiece')}</h1>
            <Alert variant={'danger'} >
            {t('pageadministrateur.confirmationsuppresion')}
            </Alert>

            <Button variant={'primary'} className={'mr-1'} onClick={confirmerSuppression} >{t('bouton.supprimer')}</Button>

            <Link to="/admin">
                <Button variant={'danger'}>{t('bouton.annuler')}</Button>
            </Link>
        </Container>
    );
}

export default PageSupprimerPiece;