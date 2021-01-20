import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UtiliseAUTH} from '../Context/Auth'


  function RoutePrivee( {component:Component,...reste}){
    const {authentification}=UtiliseAUTH();
    //const {authentificationAdmin}=UtiliseAUTH();
    return(
        <>
         <Route {...reste}
         render={(props) =>authentification?(

          <Component {...props}/>
         ):(

          <Redirect to="/"/>
         )
        }
        />
        </>
    )

    
  }

  export default RoutePrivee;