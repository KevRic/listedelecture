import React from 'react';
import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'

function PageAjouter() {
    return (
    <Container>
        <h1>Ajouter une nouvelle pièce</h1>
        <FormulaireAjouterPiece />
        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </Container>
    );    
}

export default PageAjouter;