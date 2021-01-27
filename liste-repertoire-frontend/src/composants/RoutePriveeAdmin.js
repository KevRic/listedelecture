import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UtiliseAUTH} from '../Context/Auth';

  function RoutePriveeAdmin( {component:Component,...reste}){
    const {authentification}=UtiliseAUTH();
    return (
      <Route {...reste} render={props => {
          
          if (!authentification.estAdmin) {
              
              return <Redirect to="pageConnection" />
          }

          if (authentification.estAdmin) {
  
            return <Component {...props} />
          }
          
      }} />
  );
    
  }

  export default RoutePriveeAdmin;