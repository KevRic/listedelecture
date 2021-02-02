
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { React,useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import {UtiliseAUTH} from '../Context/Auth'
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container'

function FormulaireConnectionAdmin(){

    const [nomUtilisateur, setnomUtilisateur] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const {setAuthentificationAdmin}=UtiliseAUTH();
    const {setAuthentificationUtilisateur}=UtiliseAUTH();
    const {setMasquerPageProfile}=UtiliseAUTH();
    const {setNomUtilisateur}=UtiliseAUTH();
       const  SeConnecter = async () => {
            if(nomUtilisateur.length===0|| password.length===0){

               AfficherAlert("Attention tous les champs sont obligatoires","danger")
            }
            else
            {

                await fetch(`/api/admins/authentifier`,
                {
                    method: 'post',
                    body: JSON.stringify({NomUtilisateur:nomUtilisateur,Password:password}),
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
                        
                        AfficherAlert("L'admin n'existe pas ","danger");
                      }
                    response.json().then(

                        data=>{
                            if(response.status===200)
                            {
                                setAuthentificationAdmin(true);
                                setAuthentificationUtilisateur(false);
                                setMasquerPageProfile('block');
                                setNomUtilisateur('');
                                setRediriger(true);
                            }
                        }
                    )
                })
            };
        }
        
        function AfficherAlert(message,alert)
        {
            setAlertConnection(message);
            setAlertColorReponse(alert);
        }
    
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }
    
    return(

    <Container>
   
    {AfficherRedirection()}
    <Form className="width">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom d'utilisateur :  </Form.Label>
                <Form.Control type="text" value={nomUtilisateur} required
                  
                   onChange={(event) => setnomUtilisateur(event.target.value)}  />
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
            
 </Form>
   <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
   </Container>   
    )
}

export default FormulaireConnectionAdmin;