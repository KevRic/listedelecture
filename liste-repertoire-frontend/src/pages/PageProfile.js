import {React,useState,useEffect} from 'react'
import { Container } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

import {UtiliseAUTH} from '../Context/Auth'

function PageProfile(){
    const { IdUtilisateur} = UtiliseAUTH();
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/utilisateurs/${IdUtilisateur}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setPrenom(body.Prenom);
            setNom(body.Nom);
            setEmail(body.Email);
        };
        chercherDonnees();
    }, [IdUtilisateur]);
    return(

        <Container fluid>
            <div className="mb-2">
               <Link to={`/PageModifierProfile/${IdUtilisateur}`}>
                  <Button  variant="success"  >Modifier profile</Button>
               </Link>
            </div>
            
                <Alert variant={"success"}>
                   Nom :   <h2> {nom}</h2> 
                   Prénom :  <h2>{prenom}</h2>
                   Email :  <h2> {email}</h2>
                </Alert>
        </Container>
    )
}

export default PageProfile;