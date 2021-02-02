
import {
  React,
  useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
function FormulaireAjouterUtilisateur() {
  const [validated, setValidated] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [alertRegistre, setAlertRegistre] = useState("");
  const [alertColorRegistre, setAlertColorRegistre] = useState("light");
  const [etatBouton, setEtatBouton] = useState(true);

  function AfficherAlert(message,alert)
  {
      setAlertRegistre(message);
      setAlertColorRegistre(alert);
  }

  const AjouterUtilisateur = async () => {

    await fetch(`/api/utilisateurs/ajouter`, {
        method: 'post',
        body: JSON.stringify({ Nom: nom, Prenom: prenom, Email: email,Password:password  }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response)=>{
      if(response.status===200){
        AfficherAlert("l'utilisateur est ajouté avec succes","success");
      }else if(response.status===406){
        AfficherAlert("Le email existe deja veuillez choisir un nouveau email","warning");
      }
      else{
        AfficherAlert("L'utilisateur n'a pas été ajoutée","danger");
      }
    })
    setEtatBouton(true);
};

function VerifierDonnesEntresParUtilisateur(){
      if (nom.length===0 || prenom.length===0 || email.length===0 || confirmPassword.length===0) {
          AfficherAlert("Tous les champs sont obligatoire","danger");
          setEtatBouton(true);
      }
  else if (password!==confirmPassword){
         AfficherAlert("mots de passe différentes","danger");
          setEtatBouton(true);
      }
  else if(password.length<6)
       {
         AfficherAlert("Mot de passe doit être 6 caractéres ou plus","danger");
        }
  else{
      AfficherAlert("Information validés","success");
      setEtatBouton(false);
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

  return (
      <Container>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Prénom</Form.Label>
          <Form.Control required type="text" value={prenom} onChange={(event) => setPrenom(event.target.value)} />
          <Form.Control.Feedback>c'est ok </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Nom</Form.Label>
          <Form.Control required type="text" value={nom} onChange={(event) => setNom(event.target.value)}/>
          <Form.Control.Feedback>c'est ok </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"  required value={email} onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Mot de passe </Form.Label>
          <Form.Control type="password" required value={password} onChange={(event) => setPassword(event.target.value)}/>
          <Form.Control.Feedback length="6" type="invalid">
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Confirmation mot de passe</Form.Label>
          <Form.Control type="password"  required value={confirmPassword} onChange={(event) => setConfirm(event.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Group>
      </Form.Group>
      <Button  className="mr-4" onClick={()=>VerifierDonnesEntresParUtilisateur()}>Vérifier</Button>
      <Button variant="primary" disabled={etatBouton} onClick={AjouterUtilisateur} >Enregistrer</Button>
       <Link to="pageConnection" className="btn btn-link pr-0">Connection?</Link>
      
    </Form>
   
    <Alert className="mt-4" variant={alertColorRegistre}>{alertRegistre}</Alert>
  </Container>
  );
}

export default FormulaireAjouterUtilisateur;