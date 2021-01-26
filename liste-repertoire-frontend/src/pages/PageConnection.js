
import FormulaireConnectionAdmin from '../composants/FormulaireConnectionAdmin'
import FormulaireConnectionUtilisateur from '../composants/FormulaireConnectionUtilisateur'
import Alert from 'react-bootstrap/Alert'
import { React} from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
function PageConnection(){

    return(

        <>
          <Tabs defaultActiveKey="admin" transition={false} id="choixFormulaire">
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