
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { React,useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import {UtiliseAUTH} from '../Context/Auth'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
function FormulaireConnectionUtilisateur({utilisateurs}){
    const {setAuthentification}=UtiliseAUTH();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertConnection, setAlertConnection] = useState('');
    const [alertColorReponse, setAlertColorReponse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    
    function  AfficherUtilisateurs() {
        return( 
           <>
           <h4>Utilisateurs disponible : </h4>
            <Table striped bordered hover >
            <thead>
                <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Password</th>
                
                </tr>
            </thead>
            {
                utilisateurs.map((utilisateur)=>
                
                    <tbody >
                    <tr>
                    <td>{utilisateur.Nom}</td>
                    <td>{utilisateur.Prenom}</td>
                    <td>{utilisateur.Email}</td>
                    <td>{utilisateur.Password}</td>
                    </tr>
                    
                </tbody>

                )
            }
           
         </Table>
            </>
        )
        
    }

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/espaceClient" />
        }
    }
    function SeConnecter(){
        

        utilisateurs.forEach(utilisateur => {

          if (email.length===0 && password.length===0){
                setAlertConnection("Attention tous les champs sont obligatoire");
                setAlertColorReponse("danger");
              }
          else  if(email===utilisateur.Email && password===utilisateur.Password)
              {
                setAlertConnection("Informations validés vous êtes identifiés");
                setAlertColorReponse("success");
                setAuthentification(true);
                setRediriger(true);
              }
            else{
                setAlertConnection("Nom utilisateur ou mot de passe incorrect");
                setAlertColorReponse("danger");
            }
            })
    }
    return(

        <>
   
    {AfficherRedirection()}
    <Form className="width">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nom utilisateur :  </Form.Label>
                <Form.Control type="email" value={email} placeholder="Entrer nom utilisateur ou email" 
                   onChange={(event) => setEmail(event.target.value)} />
                <Form.Text className="text-muted">
                
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe : </Form.Label>
                <Form.Control type="password"  placeholder="Password" value={password}
                 onChange={(event) => setPassword(event.target.value)}  />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" onClick={() =>SeConnecter()} >
                Connecter
            </Button>
            <Link to="/PageRegistre">
             <Button variant="info" className="ml-2" >
                Registre
             </Button>
            </Link>
            
 </Form>
   <Alert variant={alertColorReponse} className="mt-4 mb-4">{alertConnection}</Alert>
   <AfficherUtilisateurs/>
        </>
    )
}

export default FormulaireConnectionUtilisateur;