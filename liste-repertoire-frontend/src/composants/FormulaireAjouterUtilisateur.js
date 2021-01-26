
import {
  React,
  useState,
  useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import { Redirect,Link } from 'react-router-dom';

function FormulaireAjouterUtilisateur() {
  const [validated, setValidated] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [rediriger, setRediriger] = useState(false);
  const [alertRegistre, setAlertRegistre] = useState("");
  const [alertColorRegistre, setAlertColorRegistre] = useState("light");
  const [etatBouton, setEtatBouton] = useState(true);

  const AjouterUtilisateur = async () => {

    await fetch(`/api/utilisateurs/ajouter`, {
        method: 'post',
        body: JSON.stringify({ Nom: nom, Prenom: prenom, Email: email,Password:password  }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response)=>{
      if(response.status===200){
        setAlertRegistre("l'utilisateur est ajouté avec succes");
        setAlertColorRegistre("success");
      }else if(response.status===406){
        setAlertRegistre("Le email existe deja veuillez choisir un nouveau email");
        setAlertColorRegistre("warning");
      }
      else{
        setAlertRegistre("L'utilisateur n'a pas été ajoutée");
        setAlertColorRegistre("danger");
      }
    })
    setRediriger(true);
    setEtatBouton(true);
};

function VerifierDonnesEntresParUtilisateur(){
      if (nom.length===0 || prenom.length===0 || email.length===0 || confirmPassword.length===0) {
          setAlertRegistre("Tous les champs sont obligatoire");
          setAlertColorRegistre("danger");
          setEtatBouton(true);
      }
  else if (password!==confirmPassword){
          setAlertRegistre("mots de passe différentes");
          setAlertColorRegistre("danger");
          setEtatBouton(true);
      }
  else if(password.length<6)
       {
              setAlertRegistre("Mot de passe doit être 6 caractéres ou plus ");
              setAlertColorRegistre("danger");
        }
  else{
      setAlertRegistre("Information validés");
      setAlertColorRegistre("success");
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
      <>
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
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={password} onChange={(event) => setPassword(event.target.value)}/>
          <Form.Control.Feedback length="6" type="invalid">
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Confirm pasword</Form.Label>
          <Form.Control type="password"  required value={confirmPassword} onChange={(event) => setConfirm(event.target.value)} />
        </Form.Group>
      </Form.Row>
      <Form.Group>
      </Form.Group>
      <Button  className="mr-4" onClick={()=>VerifierDonnesEntresParUtilisateur()}>Vérifier</Button>
      <Button variant="primary" disabled={etatBouton} onClick={AjouterUtilisateur} >Enregistre</Button>
       <Link to="pageConnection" className="btn btn-link pr-0">Connection?</Link>
      
    </Form>
   
    <Alert className="mt-4" variant={alertColorRegistre}>{alertRegistre}</Alert>
    </>
  );
}

export default FormulaireAjouterUtilisateur;