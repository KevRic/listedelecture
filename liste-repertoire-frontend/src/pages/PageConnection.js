
import FormulaireConnectionAdmin from '../composants/FormulaireConnectionAdmin'
import FormulaireConnectionUtilisateur from '../composants/FormulaireConnectionUtilisateur'
import Alert from 'react-bootstrap/Alert'
import { React,useState,useEffect} from 'react'
import Tabs from 'react-bootstrap/Tabs';
//const { Formik } = formik;
import Tab from 'react-bootstrap/Tabs';
import Sonnet from 'react-bootstrap/Tabs';

function PageConnection(){

  const [listeUtilisateurs, setListeUtilisateurs] = useState([]);
  const [listeAdmins, setListeAdmins] = useState([]);
  useEffect(() => {
      const chercherDonnees = async () => {
          const resultat = await fetch(`/api/utilisateurs`);
          const body = await resultat.json().catch((error) => {console.log(error)});
          setListeUtilisateurs(body);
      };
      chercherDonnees();
  }, []);

  useEffect(() => {
    const chercherDonnees = async () => {
        const resultat = await fetch(`/api/admins`);
        const body = await resultat.json().catch((error) => {console.log(error)});
        setListeAdmins(body);
    };
    chercherDonnees();
}, []);


    return(

        <>
          <Tabs defaultActiveKey="admin" transition={false} id="choixFormulaire">
                <Tab eventKey="admin" title="Client">
                <Alert variant={"info mt-4 mb-4"}> Page connection admin  </Alert>
                   <FormulaireConnectionAdmin admins={listeAdmins}/>
                </Tab>
                <Tab eventKey="utilisateur" title="Client">
                <Alert variant={"info mt-4 mb-4"}> Page de connection client </Alert>
                    <FormulaireConnectionUtilisateur utilisateurs={listeUtilisateurs}/>
                </Tab>
        </Tabs>
        </>
    )
}

export default PageConnection;