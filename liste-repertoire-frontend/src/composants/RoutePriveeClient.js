import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UtiliseAUTH} from '../Context/Auth';


  function RoutePriveeClient( {component:Component,...reste}){

    const {authentificationUtilisateur}=UtiliseAUTH();
    return (
      <Route {...reste} render={props => 
        authentificationUtilisateur?<Component {...props} />:(
          <Redirect to="pageConnection" />
       )
      } />
  );
    
  }

  export default RoutePriveeClient;