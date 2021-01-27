import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UtiliseAUTH} from '../Context/Auth';


  function RoutePriveeClient( {component:Component,...reste}){

    const {authentification}=UtiliseAUTH();
    return (
      <Route {...reste} render={props => {
          
          if (authentification.estClient) {
  
            return <Component {...props} />
          }
          else{

            return <Redirect to="pageConnection" />
          }
      }} />
  );
    
  }

  export default RoutePriveeClient;