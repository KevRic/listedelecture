import { useState } from 'react';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { contexteAUTH } from './Context/Auth';
import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/Administratreur/PageAdmin';
import PageAjouterPiece from './pages/Administratreur/PageAjouterPiece';
import PageModifierPiece from './pages/Administratreur/PageModifierPiece';
import PageSupprimerPiece from './pages/Administratreur/PageSupprimerPiece';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import PageCreationCompte from './pages/CreationCompte_Connection/PageCreationCompte';
import PageDemandeConnection from './pages/CreationCompte_Connection/PageDemandeConnection';
import PageConnection from "./pages/CreationCompte_Connection/PageConnection";
import PageEspaceClient from './pages/EspaceClient/PageEspaceClient';
import PageModifierDSClient from './pages/EspaceClient/PageModifierDSClient';
import PageAjouterDSClient from './pages/EspaceClient/PageAjouterDSClient';
import RoutePriveeClient from './composants/RoutePrivee/RoutePriveeClient';
import RoutePriveeAdmin from './composants/RoutePrivee/RoutePriveeAdmin';
import PageModifierUtilisateur from './pages/Utilisateur/PageModifierUtilisateur';
import PageProfile from './pages/Utilisateur/PageProfile';
import Langages from './composants/Langages';

function App() {
  const [authentificationUtilisateur, setAuthentificationUtilisateur] = useState(false);
  const [authentificationAdmin, setAuthentificationAdmin] = useState(false);
  const [IdUtilisateur, setIdUtilisateur] = useState('');
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  return (
    <contexteAUTH.Provider value={{
      authentificationUtilisateur, setAuthentificationUtilisateur, authentificationAdmin, setAuthentificationAdmin,
      IdUtilisateur, setIdUtilisateur, nomUtilisateur, setNomUtilisateur
    }}>
      <Router>
        <Container>
          <Langages/>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <RoutePriveeAdmin path="/ajouter" component={PageAjouterPiece} />
            <RoutePriveeAdmin path="/modifier/:id" component={PageModifierPiece} />
            <RoutePriveeAdmin path="/supprimer/:id" component={PageSupprimerPiece} />
            <RoutePriveeAdmin path="/admin" component={PageAdmin} />
            <RoutePriveeClient path="/pageProfile" component={PageProfile} />
            <RoutePriveeClient path="/espaceClient" component={PageEspaceClient} />
            <RoutePriveeClient path="/ajouterDemandeSpecialeClient" component={PageAjouterDSClient} />
            <RoutePriveeClient path="/modifierDemandeSpecialeClient/:id" component={PageModifierDSClient} />
            <RoutePriveeClient path="/PageModifierProfile/:id" component={PageModifierUtilisateur} />
            <Route path="/PageConnection" component={PageConnection} />
            <Route path="/PageRegistre" component={PageCreationCompte} />
            <Route path="/pageDemandeConnection" component={PageDemandeConnection} />
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </contexteAUTH.Provider>
  );
}

export default App;