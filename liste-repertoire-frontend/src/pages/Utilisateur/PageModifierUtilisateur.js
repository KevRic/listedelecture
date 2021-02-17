import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireModifierUtilisateur from '../../composants/Formulaires/Utilisateur/FormulaireModifierUtilisateur';
import { useTranslation } from 'react-i18next';
function PageModifierUtilisateur({ match }) {
    const { t } = useTranslation();
    const id = match.params.id;
    return (
        <Container>
            <h1>{t('pageutilisateur.titre')}</h1>
            <FormulaireModifierUtilisateur id={id} />
            <Link to="/PageProfile">
                <Button variant={'danger'}>{t('bouton.annuler')}</Button>
            </Link>
        </Container>
    );
}

export default PageModifierUtilisateur;