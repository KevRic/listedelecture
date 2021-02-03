import { React, useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

function PageSupprimerPiece({ match }) {
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
            <h1>Supprimer</h1>
            <Alert variant={'danger'} >
                Êtes-vous certain de vouloir supprimer cette pièce?
            </Alert>

            <Button variant={'primary'} className={'mr-1'} onClick={confirmerSuppression} >Supprimer</Button>

            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </Container>
    );
}

export default PageSupprimerPiece;