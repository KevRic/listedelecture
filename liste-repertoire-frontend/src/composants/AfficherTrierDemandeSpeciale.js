import {React} from 'react';

function AfficherTrierDemandeSpeciale({setTridemande}) {

        return (<>

            Trier:
                <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                <option value="DateDesc">DateDesc</option>
                    <option value="Date">Date</option>             
                    <option value="NomClientDesc">NomClientDesc</option>                  
                    <option value="NomClient">NomClient</option>             
                </select>
         
        </>)

}

export default AfficherTrierDemandeSpeciale;

