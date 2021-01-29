import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListeDemandesSpecialesClient from '../composants/ListeDemandesSpecialesClient';
import { UtiliseAUTH } from '../Context/Auth';


function PageEspaceClient() {
   const { authentification } = UtiliseAUTH();
   const IdUtilisateur = authentification.id;
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
      <>
         <Row>
            <Col><h2>Liste de vos Demandes Spéciales</h2></Col>
            <Col className="text-center">
               <Link to="/ajouterDemandeSpecialeClient">
                  <Button>Ajouter une nouvelle demande spéciale</Button>
               </Link>
            </Col>
         </Row>
         <ListeDemandesSpecialesClient demandesSpeciales={listeDemandesSpecialesClient} />

      </>
   )
}

export default PageEspaceClient;