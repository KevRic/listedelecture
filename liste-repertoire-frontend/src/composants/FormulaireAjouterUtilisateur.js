import  Form  from'react-bootstrap/Form'
import  Button from'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'

import {
  React,
  useState,
  useEffect
} from 'react';

import { Redirect } from 'react-router-dom';


function FormularireAjouterUtilisateur(){
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rediriger, setRediriger] = useState(false);
  const [validated, setValidated] = useState(false);

  const AjouterUtilisateur = async () => {
    await fetch(`/api/utilisateurs/ajouter`, {
        method: 'post',
        body: JSON.stringify({ Nom: nom, Prenom: prenom,Email :email, Password:password  }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    setRediriger(true);
};
function AfficherRedirection() {
  if (rediriger === true) {
      return <Redirect to="/" />
  }
}
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    
    return(

        <>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            required
            type="text" value={prenom} onChange={(event) => setPrenom(event.target.value)}
            placeholder="Prénom"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Correct!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text" value={nom} onChange={(event) => setNom(event.target.value)}
            placeholder="Nom"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control type="Email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email" required />
          <Form.Control.Feedback type="invalid">
            Entrer votre email svp.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" value={password}  onChange={(event) => setPassword(event.target.value)}placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Entrer mot de passe
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Confirmer</Form.Label>
          <Form.Control type="Password" placeholder="" required />
          <Form.Control.Feedback type="invalid">
            Mots de passe différent
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Confirmer"
          feedback="Vous devrez confirmer avant d'envoyer."
        />
      </Form.Group>
      <Button onClick={AjouterUtilisateur}>Registrer</Button>
    </Form>
        
        </>
    )
};

export default FormularireAjouterUtilisateur;