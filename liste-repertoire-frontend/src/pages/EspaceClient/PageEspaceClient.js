import { React, useState, useEffect } from 'react';
import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UtiliseAUTH } from '../../Context/Auth';
import AfficherListeDemandesSpecialesClient from '../../composants/Affichage/AfficherListeDemandesSpecialesClient';
import { useTranslation } from 'react-i18next';

function PageEspaceClient() {
   const { t } = useTranslation();
   const { IdUtilisateur, nomUtilisateur } = UtiliseAUTH();
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
                  <h1 style={{ fontFamily: 'Rock' }}>{t('pageespaceclient.bienvenue')} {nomUtilisateur}</h1>
               </Alert>
            </Col>
         </Row>
         <Row>
            <Col>
               <h5 style={{ fontFamily: 'Rock' }}>{t('pageespaceclient.historiquedemandesspeciales')} :</h5>
            </Col>
            <Col className="text-right">
               <Link to="/ajouterDemandeSpecialeClient">
                  <Button variant="primary" className="mb-2">{t('bouton.ajouterdemandespeciale')}</Button>
               </Link>
            </Col>
         </Row>
         <AfficherListeDemandesSpecialesClient demandesSpeciales={listeDemandesSpecialesClient} />
      </Container>
   )
}

export default PageEspaceClient;