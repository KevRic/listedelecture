
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { React,useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import {UtiliseAUTH} from '../Context/Auth'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
function FormulaireConnectionUtilisateur(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const {setAuthentificationUtilisateur}=UtiliseAUTH();
    const {setNomUtilisateur}=UtiliseAUTH();
    const {setIdUtilisateur}=UtiliseAUTH();
    const {setAuthentificationAdmin}=UtiliseAUTH();
    const {setMasquerPageProfile}=UtiliseAUTH();
       const  SeConnecter = async () => {
            if(email.length===0|| password.length===0){

                AfficherAlert("Attention tous les champs sont obligatoires ","danger");
            }
            else if(password.length<6)
            {
                AfficherAlert("Mot de passe doit être 6 caractéres ou plus","danger");
            }
            else
            {

                await fetch(`/api/utilisateurs/authentifier`,
                {
                    method: 'post',
                    body: JSON.stringify({Email:email,Password:password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                }
                ).then((response) =>{

                    if(response.status===200){
                        
                        AfficherAlert("Vous êtes identifiée","success");

                      }
                      else 
                      {
                        
                        AfficherAlert("L'utilisateur n'existe pas ","danger");
                      }
                    response.json().then(

                        data=>{
                            if(response.status===200)
                            {
                                setAuthentificationUtilisateur(true);
                                setAuthentificationAdmin(false);
                                setNomUtilisateur(data.Nom);
                                setIdUtilisateur(data._id);
                                setMasquerPageProfile('block');
                                setRediriger(true);
                            }
                        }
                    )
                })
             }
            }

            function AfficherAlert(message,alert)
            {
                setAlertConnection(message);
                setAlertColorReponse(alert);
            }
    
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }
    
    return(

    <Container>
   
    {AfficherRedirection()}
    <Form className="width">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email :  </Form.Label>
                <Form.Control type="email" value={email} required
                  
                   onChange={(event) => setEmail(event.target.value)}  />
                   <Form.Control.Feedback type="invalid">
                     Saisie un email valid svp.
                 </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe : </Form.Label>
                <Form.Control type="password"  required value={password}
                 onChange={(event) => setPassword(event.target.value)}  />
            </Form.Group>
            <Button variant="primary"  onClick={()=>SeConnecter()} > Connecter</Button>
            <Link to="pageRegistre" className="btn btn-link pr-0">Créer un compte?</Link>
            
   </Form>
   <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
   </Container>
    )
}

export default FormulaireConnectionUtilisateur;