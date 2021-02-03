import { React, useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../../../Context/Auth';

function FormulaireConnectionUtilisateur(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const { setAuthentificationAdmin, setAuthentificationUtilisateur, setNomUtilisateur, setIdUtilisateur } = UtiliseAUTH();

    const SeConnecter = async () => {
        if (email.length === 0 || password.length === 0) {

            AfficherAlert("Attention tous les champs sont obligatoires ", "danger");
        }
        else if (password.length < 6) {
            AfficherAlert("Mot de passe doit être 6 caractéres ou plus", "danger");
        }
        else {
            await fetch(`/api/utilisateurs/authentifier`,
                {
                    method: 'post',
                    body: JSON.stringify({ Email: email, Password: password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {

                if (response.status === 200) {
                    AfficherAlert("Vous êtes identifiée", "success");
                }
                else {
                    AfficherAlert("L'utilisateur n'existe pas ", "danger");
                }
                response.json().then(
                    data => {
                        if (response.status === 200) {
                            setAuthentificationUtilisateur(true);
                            setAuthentificationAdmin(false);
                            setNomUtilisateur(data.Nom);
                            setIdUtilisateur(data._id);
                            props.setRediriger("espaceClient");
                        }
                    }
                )
            })
        }
    }

    function AfficherAlert(message, alert) {
        setAlertConnection(message);
        setAlertColorReponse(alert);
    }

    return (
        <>
            <Container>
                <Form className="width">
                    <Form.Group controlId="formBasicEmailUtilisateur">
                        <Form.Label>Email :  </Form.Label>
                        <Form.Control type="email" value={email} required onChange={(event) => setEmail(event.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Saisie un email valid svp.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordUtilisteur">
                        <Form.Label>Mot de passe : </Form.Label>
                        <Form.Control type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => SeConnecter()} > Connecter</Button>
                    <Link to="pageRegistre" className="btn btn-link pr-0">Créer un compte?</Link>

                </Form>
                <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
            </Container>
        </>
    )
}

export default FormulaireConnectionUtilisateur;