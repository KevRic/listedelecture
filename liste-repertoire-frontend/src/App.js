import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import PageRegistre from './pages/PageRegistre';
import  PageConnection from "./pages/PageConnection";
import PageEspaceClient from './pages/PageEspaceClient';
import PageModifierDSClient from './pages/PageModifierDSClient';
import PageAjouterDSClient from './pages/PageAjouterDSClient';
import RoutePriveeClient from './composants/RoutePriveeClient';
import RoutePriveeAdmin from './composants/RoutePriveeAdmin';
import PageModifierProfile from './pages/PageModifierProfile';
import PageProfile from './pages/PageProfile'
import {contexteAUTH} from './Context/Auth';
import {useState} from 'react';
//import PageDemandeSpeciale from './pages/PageDemandeSpeciale';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  const [authentificationUtilisateur,setAuthentificationUtilisateur]=useState(false);
  const [authentificationAdmin,setAuthentificationAdmin]=useState(false);
  const [IdUtilisateur,setIdUtilisateur]=useState('');
  const [nomUtilisateur,setNomUtilisateur]=useState('');
  const [MasquerPageProfile,setMasquerPageProfile]=useState('none');
  return (
    <contexteAUTH.Provider value={{authentificationUtilisateur,setAuthentificationUtilisateur,authentificationAdmin,setAuthentificationAdmin,
    IdUtilisateur,setIdUtilisateur,nomUtilisateur,setNomUtilisateur 
    ,MasquerPageProfile,setMasquerPageProfile}}>
    <Router>
      <Container>
        <BarreNavigation />
        <Switch>
          <Route path="/" component={PageAccueil} exact />
          <Route path="/repertoire" component={PageRepertoire} />
          <Route path="/ajouter" component={PageAjouter} />
          <Route path="/modifier/:id" component={PageModifier} />
          <Route path="/supprimer/:id" component={PageSupprimer} />

          <RoutePriveeAdmin path="/admin" component={PageAdmin}/>
          <RoutePriveeClient path="/pageProfile" component={PageProfile}/>
          <RoutePriveeClient path="/espaceClient" component={PageEspaceClient}/>
          <RoutePriveeClient path="/ajouterDemandeSpecialeClient" component={PageAjouterDSClient}/>
          <RoutePriveeClient path="/modifierDemandeSpecialeClient/:id" component={PageModifierDSClient}/>
          <RoutePriveeClient path="/PageModifierProfile/:id" component={PageModifierProfile}/>
          <Route path="/PageConnection" component={PageConnection} /> 
          <Route path="/PageRegistre" component={PageRegistre} /> 
          <Route component={Page404} />
        </Switch>        
      </Container>
    </Router>
    </contexteAUTH.Provider>
  );
}

export default App;