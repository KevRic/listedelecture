
import FormulaireConnectionAdmin from '../composants/FormulaireConnectionAdmin'
import FormulaireConnectionUtilisateur from '../composants/FormulaireConnectionUtilisateur'
import Alert from 'react-bootstrap/Alert'
import { React} from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import { UtiliseAUTH } from '../Context/Auth';
function PageConnection(){
const {authentificationUtilisateur}=UtiliseAUTH();
const {authentificationAdmin}=UtiliseAUTH();

function VerifierAuthentificationClient(){
    if(!authentificationUtilisateur&&authentificationAdmin || authentificationUtilisateur&&!authentificationAdmin ){
        return(
            <Alert variant={"danger"}>Vous n'avez pas le droit pour accéder à cette page </Alert>
        )
    }
    else{
        return(
     
            <Alert variant={"info"}>Connectz vous !!!!! </Alert>

        )
    }
}
    return(

        <>
        <VerifierAuthentificationClient/>
          <Tabs  id="choixFormulaire">
                <Tab eventKey="utilisateur" title="Client">
                <Alert variant={"info mt-4 mb-4"}> Page de connection client </Alert>
                    <FormulaireConnectionUtilisateur />
                </Tab>
                <Tab eventKey="admin" title="Admin">
                <Alert variant={"info mt-4 mb-4"}> Page connection admin  </Alert>
                   <FormulaireConnectionAdmin/>
                </Tab>
        </Tabs>
        </>
    )
}

export default PageConnection;