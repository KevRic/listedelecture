import { React, useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { UtiliseAUTH } from '../../../Context/Auth';

function FormulaireConnectionAdmin(props) {

    const [nomUtilisateur, setnomUtilisateur] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const { setAuthentificationAdmin, setAuthentificationUtilisateur, setNomUtilisateur } = UtiliseAUTH();

    const SeConnecter = async () => {

        if (nomUtilisateur.length === 0 || password.length === 0) {
            AfficherAlert("Attention tous les champs sont obligatoires", "danger")
        }
        else {

            await fetch(`/api/admins/authentifier`,
                {
                    method: 'post',
                    body: JSON.stringify({ NomUtilisateur: nomUtilisateur, Password: password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                if (response.status === 200) {
                    AfficherAlert("Vous êtes identifiée", "success");
                }
                else {
                    AfficherAlert("L'admin n'existe pas ", "danger");
                }
                response.json().then(

                    data => {
                        if (response.status === 200) {
                            setAuthentificationAdmin(true);
                            setAuthentificationUtilisateur(false);
                            setNomUtilisateur('');
                            props.setRediriger("admin");
                        }
                    }
                )
            })
        };
    }

    function AfficherAlert(message, alert) {
        setAlertConnection(message);
        setAlertColorReponse(alert);
    }

    return (
        <Container>
            <Form className="width">
                <Form.Group controlId="formBasicEmailAdmin">
                    <Form.Label>Nom d'utilisateur :  </Form.Label>
                    <Form.Control type="text" value={nomUtilisateur} required

                        onChange={(event) => setnomUtilisateur(event.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Saisie un email valid svp.
                 </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordAdmin">
                    <Form.Label>Mot de passe : </Form.Label>
                    <Form.Control type="password" required value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={() => SeConnecter()} > Connecter</Button>

            </Form>
            <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
        </Container>
    )
}

export default FormulaireConnectionAdmin;