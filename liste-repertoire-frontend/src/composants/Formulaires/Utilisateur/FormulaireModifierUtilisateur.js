import { React, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function FormulaireModifierUtilisateur({ id }) {
    const [Nom, setNom] = useState('');
    const [Prenom, setPrenom] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmMotDePasse, setConfirmMotDePasse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [alertCategorie, setAlertCategorie] = useState("");
    const [alertColor, setAlertColor] = useState("light");

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/utilisateurs/${id}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setNom(body.Nom);
            setPrenom(body.Prenom);
            setEmail(body.Email);
            setPassword(body.Password);
        };
        chercherDonnees();
    }, [id]);

    const envoyerFormulaire = async () => {
        if (Nom.length > 1 && Prenom.length > 1 && Email.length > 0 && Password.length > 1) {
            await fetch(`/api/utilisateurs/modifier/${id}`, {
                method: 'put',
                body: JSON.stringify({ Nom: Nom, Prenom: Prenom, Email: Email, Password: Password }),

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
        }
        else {
            setAlertCategorie("Utilisateur incomplète ... veuillez entrer des champs valides.");
            setAlertColor("danger");
        }
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/PageProfile" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Alert variant={alertColor}>{alertCategorie}</Alert>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Prénom : </Form.Label>
                    <Form.Control type="text" value={Prenom}
                        onChange={(event) => setPrenom(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nom : </Form.Label>
                    <Form.Control type="text" value={Nom}
                        onChange={(event) => setNom(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >Email : </Form.Label>
                    <Form.Control type="email" value={Email}
                        onChange={(event) => setEmail(event.target.value)} />

                </Form.Group>

                <Form.Group>
                    <Form.Label >Mot de passe  : </Form.Label>
                    <Form.Control type="password" value={Password}
                        onChange={(event) => setPassword(event.target.value)} />

                </Form.Group>

                <Form.Group>
                    <Form.Label > Confirmation mot de passe  : </Form.Label>
                    <Form.Control type="password" value={ConfirmMotDePasse}
                        onChange={(event) => setConfirmMotDePasse(event.target.value)} />

                </Form.Group>
                <Button variant="primary mr-2" onClick={() => envoyerFormulaire()} >
                    Modifier
            </Button>

            </Form>
        </>
    );
}

export default FormulaireModifierUtilisateur;