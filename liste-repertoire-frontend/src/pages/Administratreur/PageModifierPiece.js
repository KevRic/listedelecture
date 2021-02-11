import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireModifierPiece from '../../composants/Formulaires/Piece/FormulaireModifierPiece';
import { useTranslation } from 'react-i18next';

function PageModifierPiece({ match }) {
    const { t } = useTranslation();
    const id = match.params.id;
    return (
        <>
            <h1>{t('pageadministrateur.titremodifierpiece')}</h1>
            <FormulaireModifierPiece id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >{t('bouton.annuler')}</Button>
            </Link>
        </>
    );
}

export default PageModifierPiece;