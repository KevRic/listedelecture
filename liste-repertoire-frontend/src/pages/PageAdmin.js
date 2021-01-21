import {
    React,
    useState,
    useEffect
} from 'react';
import Col from 'react-bootstrap/Col';
import ListePiecesAdmin from '../composants/ListePiecesAdmin';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import ListeDemandeSpecialeAdmin from '../composants/ListeDemandeSpecialeAdmin';
import PageAdminDemandeSpeciale from './PageAdminDemandeSpeciale';

function PageAdmin() {
    const [listePieces, setListePieces] = useState([]);
    //const [demandesSpeciales, setDemandesSpeciales] = useState([]);
    const [typeTripieces, settypeTripieces] = useState('Titre');
    // const [typeTridemande, setTridemande] = useState('Titre');
 

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    // useEffect(() => {
             
    //         const chercherDonnees = async () => {
    //             const resultat = await fetch(`/api/demandespeciales`);
    //             const body = await resultat.json().catch((error) => { console.log(error) });
    //             setDemandesSpeciales(body);
    //         };
    //         chercherDonnees();      
       
    // }, [typeTripieces]);


    useEffect(() => {
        const triList = type => {
            const types = {
                Titre: 'Titre',
                Artiste: 'Artiste',
                TitreDesc: 'Titre',
                ArtisteDesc: 'Artiste',
                Categorie: 'Titre',
                CategorieDesc: 'Titre',
            };
            const proprieteTri = types[type];
            const listTemp = listePieces.slice();
            var listTrier = undefined;
            if (typeTripieces === "ArtisteDesc" || typeTripieces === "TitreDesc") {
                listTrier = listTemp.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1);
            }
            else {
                listTrier = listTemp.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1);
            }
            setListePieces(listTrier);
        };
        triList(typeTripieces);
    }, [typeTripieces]);

    
    // useEffect(() => {
    //     const triListDemande = type => {
    //         const types = {
    //             Date: 'Date',
    //             NomClient: 'NomClient',
    //         };
    //         const proprieteTri = types[type];
    //         const listTempDemande = demandesSpeciales.slice();
    //         var listTrierDemande = undefined;
    //         if (typeTridemande === "NomClient" || typeTridemande === "Date") {
    //            listTrierDemande = listTempDemande.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1)
    //         }
    //         else {
    //             ;
    //         }
    //         setDemandesSpeciales(listTrierDemande);
           
    //     }
    //     triListDemande(typeTridemande);
      
    // }, [typeTridemande]);



 
  
    return (
        <>
            <Alert variant={"warning"} className="mt-3">
                <h1>Page administrateur</h1>
            </Alert>


            <>
          <Tabs defaultActiveKey="tabAdministrateur" transition={false} id="choixTabadministrateur">
                <Tab eventKey="admin" title="Manipulation de pieces">
                <Row className="my-2 ">
                <Col>
                    <Link to="/ajouter">
                        <Button>Ajouter une nouvelle pièce</Button>
                    </Link>
                </Col>
                <Col style={{ textAlign: 'right' }}>  Trier:
        <select className="ml-2" onChange={(e) => settypeTripieces(e.target.value)}>
                        <option value="Titre">Titre</option>
                        <option value="Artiste">Artiste</option>
                        <option value="Categorie">Categorie</option>
                        <option value="TitreDesc">TitreDesc</option>
                        <option value="ArtisteDesc">ArtisteDesc</option>
                        <option value="CategorieDesc">CategorieDesc</option>
                    </select>
                </Col>
            </Row>

            <ListePiecesAdmin pieces={listePieces} typeTripieces={typeTripieces} />
                </Tab>

                <Tab eventKey="tabManipulationdemande" title="Manipulation demandes speciales">
                 {/* <Row className="my-2">
                  <Col style={{ textAlign: 'right' }}> 
                  <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                        <option value="Date">Date</option>
                        <option value="NomClient">NomClient</option>
                    </select>     
                
                </Col>              
                </Row>
                <ListeDemandeSpecialeAdmin demandesSpeciales={demandesSpeciales} /> */}
                <PageAdminDemandeSpeciale/>
                </Tab>
        </Tabs>
        </>






           
        </>
    );
}

export default PageAdmin;