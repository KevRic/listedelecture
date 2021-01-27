import {React} from 'react';

function AfficherTrierDemandeSpeciale({setTridemande}) {

        return (<>

            Trier:
                <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                    <option value="Date">Date</option>
                    <option value="NomClient">NomClient</option>
                    <option value="DateDesc">DateDesc</option>
                    <option value="NomClientDesc">NomClientDesc</option>
                </select>
         
        </>)

}

export default AfficherTrierDemandeSpeciale;

