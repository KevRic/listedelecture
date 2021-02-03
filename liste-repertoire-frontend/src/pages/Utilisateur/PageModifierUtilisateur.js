import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireModifierUtilisateur from '../../composants/Formulaires/Utilisateur/FormulaireModifierUtilisateur';

function PageModifierUtilisateur({ match }) {
    const id = match.params.id;
    return (
        <Container>
            <h1>Modifier</h1>
            <FormulaireModifierUtilisateur id={id} />
            <Link to="/PageProfile">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </Container>
    );
}

export default PageModifierUtilisateur;