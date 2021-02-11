import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireAjouterPiece from '../../composants/Formulaires/Piece/FormulaireAjouterPiece';
import { useTranslation } from 'react-i18next';

function PageAjouterPiece() {
    const { t } = useTranslation();
    return (
        <Container>
            <h1>{t('pageadministrateur.titreajouterpiece')}</h1>
            <FormulaireAjouterPiece />
            <Link to="/admin">
                <Button variant={'danger'}>{t('bouton.annuler')}</Button>
            </Link>
        </Container>
    );
}

export default PageAjouterPiece;