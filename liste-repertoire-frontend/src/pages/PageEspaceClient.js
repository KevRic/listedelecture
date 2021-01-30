import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListeDemandesSpecialesClient from '../composants/ListeDemandesSpecialesClient';
import { UtiliseAUTH } from '../Context/Auth';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';


function PageEspaceClient() {
   const { IdUtilisateur , nomUtilisateur } = UtiliseAUTH();
   const [listeDemandesSpecialesClient, setListeDemandes] = useState([]);

   useEffect(() => {
      const chercherDonnees = async () => {
         const resultat = await fetch(`/api/demandespeciales/utilisateur/${IdUtilisateur}`);
         const body = await resultat.json().catch((error) => { console.log(error) });
         setListeDemandes(body);
      };
      chercherDonnees();
   }, [IdUtilisateur]);

   return (

      <Container fluid>
         <Row>
            <Col>
               <Alert variant="dark">
                  <h1 style={{ fontFamily: 'Rock' }}>Bienvenue {nomUtilisateur}</h1>
               </Alert>
            </Col>
         </Row>
         <Row>
            <Col>
               <h5 style={{ fontFamily: 'Rock' }}>Liste de vos Demandes Spéciales :</h5>
            </Col>
            <Col className="text-right">
               <Link to="/ajouterDemandeSpecialeClient">
                  <Button variant="primary" className="mb-2">Ajouter une nouvelle demande spéciale</Button>
               </Link>
            </Col>
         </Row>
         <ListeDemandesSpecialesClient demandesSpeciales={listeDemandesSpecialesClient} />
      </Container>







   )
}

export default PageEspaceClient;