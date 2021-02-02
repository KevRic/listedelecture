
import FormulaireConnectionAdmin from '../composants/FormulaireConnectionAdmin'
import FormulaireConnectionUtilisateur from '../composants/FormulaireConnectionUtilisateur'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import { React} from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import { UtiliseAUTH } from '../Context/Auth';
function PageConnection(){
const {authentificationUtilisateur}=UtiliseAUTH();
const {authentificationAdmin}=UtiliseAUTH();
function VerifierAuthentificationClient(){
    if(!authentificationUtilisateur&&authentificationAdmin) {
        return(
            <Alert variant={"danger"}>Vous n'avez pas le droit d'accéder à la page espace client </Alert>
        )
    }
    else if(authentificationUtilisateur&&!authentificationAdmin) {
        return(
     
            <Alert variant={"danger"}>Vous n'avez pas le droit d'accéder à la page admin </Alert>

        )
    }
    else{

        return(
     
            <Alert variant={"info"}>Connectez vous !!! </Alert>

        )

    }
}
    return(

        <Container>
        <VerifierAuthentificationClient/>
        <div >
                <Tabs   transition={false} id="choixFormulaire">
                        <Tab  eventKey="utilisateur" title="Client">
                        <Alert variant={"info mt-4 mb-4"}> Page de connection client </Alert>
                            <FormulaireConnectionUtilisateur />
                        </Tab>
                        <Tab  eventKey="admin" title="Admin">
                        <Alert variant={"info mt-4 mb-4"}> Page connection admin  </Alert>
                        <FormulaireConnectionAdmin/>
                        </Tab>
                </Tabs>
        </div>
          
        </Container>
    )
}

export default PageConnection;