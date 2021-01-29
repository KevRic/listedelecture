import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UtiliseAUTH} from '../Context/Auth';

  function RoutePriveeAdmin( {component:Component,...reste}){
    const {authentificationAdmin}=UtiliseAUTH();
    return (
      <Route {...reste} render={props => 
          authentificationAdmin?<Component {...props} />:(
             <Redirect to="pageConnection" />
          )
          
      } />
  );
    
  }

  export default RoutePriveeAdmin;