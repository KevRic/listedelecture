import React from 'react';
import FormulaireModifieProfile from '../composants/ComptesEtConnection/FormulaireModifieProfile'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

function PageModifierProfile({ match }) {
    const id = match.params.id;
    return (
        <Container>
            <h1>Modifier</h1>
            <FormulaireModifieProfile id={id} />
            <Link to="/PageProfile">
                <Button variant={'danger'} >Annuler</Button>    
            </Link>
        </Container>
    ); 
}

export default PageModifierProfile;