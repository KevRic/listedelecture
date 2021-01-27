import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {UtiliseAUTH} from '../Context/Auth';
function EspaceClient  () {
   const {authentification}=UtiliseAUTH();
     return(

        <>
         
         <Alert className="mr-0 mt-0 w-100" variant={"info"}>Bienvenue :  {authentification.utilisateur}</Alert>
         <p>Id : {authentification.id}</p>
         <Alert variant={"secondary"}>Bienvenue dans la page espace client </Alert>
        </>
     )
}

export default EspaceClient;