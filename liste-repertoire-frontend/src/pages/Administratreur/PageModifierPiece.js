import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireModifierPiece from '../../composants/Formulaires/Piece/FormulaireModifierPiece';

function PageModifierPiece({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierPiece id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </>
    );
}

export default PageModifierPiece;