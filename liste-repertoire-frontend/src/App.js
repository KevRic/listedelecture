import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import PageRegistre from './pages/PageRegistre';
import  PageConnection from "./pages/PageConnection"
import PageEspaceClient from './pages/PageEspaceClient'
import RoutePriveeClient from './composants/RoutePriveeClient'
import RoutePriveeAdmin from './composants/RoutePriveeAdmin'
import {contexteAUTH} from './Context/Auth'
import {useState} from 'react';
//import PageDemandeSpeciale from './pages/PageDemandeSpeciale';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  const [authentification,setAuthentification]=useState({estClient:false,estadmin:false,id:"",utilisateur:""});
  return (
    <contexteAUTH.Provider value={{authentification,setAuthentification}}>
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
          <RoutePriveeClient path="/espaceClient" component={PageEspaceClient}/>
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