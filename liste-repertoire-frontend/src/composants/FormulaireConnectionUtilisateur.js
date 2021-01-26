
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { React,useState,useEffect} from 'react'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import {UtiliseAUTH} from '../Context/Auth'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


function FormulaireConnectionUtilisateur(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [utilisateurActuelle,setUtilisateurActuel]=useState({})
    const {setAuthentification}=UtiliseAUTH();

       const  SeConnecter = async () => {
            if(email.length===0|| password.length===0){

                setAlertConnection("Attention tous les champs sont obligatoires ");
                setAlertColorReponse("danger");
            }
            else if(password.length<6)
            {
                setAlertConnection("Mot de passe doit être 6 caractéres ou plus ");
                setAlertColorReponse("danger");
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
                ).then( (response) => {response.json().then(
                    
                    data=> {
                        if(response.status===200){
                            setAuthentification(true);
                            setUtilisateurActuel({_d:data._id,Nom:data.Nom,Prenom:data.Prenom,Email:data.Email,Password:data.Password});
                            console.log(utilisateurActuelle);
                            setAlertConnection("Vous êtes identifiés !!!");
                            setAlertColorReponse("success");
                        }
                        else 
                        {
                            setAuthentification(false);
                            setAlertConnection("l'utilisateur n'existe pas ");
                            setAlertColorReponse("danger");
                        }
                        
                        console.log(response.status)
                } )})
            };
            }
        
        
    
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }
    
    return(

        <>
   
    {AfficherRedirection()}
    <Form className="width">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom utilisateur :  </Form.Label>
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
            <Link to="pageRegistre" className="btn btn-link pr-0">Registre?</Link>
            
 </Form>
   <Alert variant={alertColorReponse} className="mt-4 mb-4"> {alertConnection}</Alert>
        </>
    )
}

export default FormulaireConnectionUtilisateur;