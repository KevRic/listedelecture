import { React, useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../../../Context/Auth';
import { useTranslation } from 'react-i18next';

function FormulaireConnectionUtilisateur(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const { setAuthentificationAdmin, setAuthentificationUtilisateur, setNomUtilisateur, setIdUtilisateur } = UtiliseAUTH();
    const { t } = useTranslation();

    const SeConnecter = async () => {
        if (email.length === 0 || password.length === 0) {

            AfficherAlert(t('avertissementchampobligatoire'), "danger");
        }
        else if (password.length < 6) {
            AfficherAlert(t('avertissementmotpasse6'), "danger");
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
                    AfficherAlert(t('vouseteidentifier'), "success");
                }
                else {
                    AfficherAlert(t('utilisateurnexistepas'), "danger");
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
                        {t('avertissementemailvalide')}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordUtilisteur">
                        <Form.Label>{t('motdepasse')} : </Form.Label>
                        <Form.Control type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => SeConnecter()} > {t('bouton.connexion')}</Button>
                    <Link to="pageRegistre" className="btn btn-link pr-0">{t('creecompte')}</Link>

                </Form>
                <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
            </Container>
        </>
    )
}

export default FormulaireConnectionUtilisateur;