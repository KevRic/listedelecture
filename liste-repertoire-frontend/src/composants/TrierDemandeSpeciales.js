import {
    React,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

function TrierDemandeSpeciale({ demandesSpeciales, setListeDemandes, typeTridemande, setTridemande }) {

    useEffect(() => {
        const triListDemande = type => {
            const types = {
                Date: 'Date',
                NomClient: 'NomClient',
                DateDesc: 'Date',
                NomClientDesc: 'NomClient',
            };
            const proprieteTri = types[type];
            const listTempDemande = demandesSpeciales.slice();
            var listTrierDemande = undefined;
            if (typeTridemande === "NomClient" || typeTridemande === "Date") {
                listTrierDemande = listTempDemande.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1)
            }
            else {
                listTrierDemande = listTempDemande.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1)
            }
            setListeDemandes(listTrierDemande);

        }
        triListDemande(typeTridemande);


    }, [typeTridemande]);


    if (demandesSpeciales?.length) {

        return (<>

            <Col style={{ textAlign: 'right' }}>  Trier:
                <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                    <option value="Date">Date</option>
                    <option value="NomClient">NomClient</option>
                    <option value="DateDesc">DateDesc</option>
                    <option value="NomClientDesc">NomClientDesc</option>
                </select>
            </Col>
        </>)

    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de demandes speciales dans le répertoire.</Alert>;
    }
}

export default TrierDemandeSpeciale;

