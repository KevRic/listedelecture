import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireAjouterPiece from '../../composants/Formulaires/Piece/FormulaireAjouterPiece';

function PageAjouterPiece() {
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

export default PageAjouterPiece;