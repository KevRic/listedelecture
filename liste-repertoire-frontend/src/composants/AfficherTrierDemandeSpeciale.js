import {React} from 'react';
import Col from 'react-bootstrap/Col';

function AfficherTrierDemandeSpeciale({setTridemande}) {

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

export default AfficherTrierDemandeSpeciale;

