import {
    React,
    useState,
    useEffect,
} from 'react';

import ListeDemandesSpecialesAdmin from '../composants/ListeDemandeSpecialeAdmin';

function PageAdminDemandeSpeciale() {
    const [listeDemandesSpeciales, setListePieces] = useState([]);
    const [test,setTest] = useState(1);
    const [typeTridemande, setTridemande] = useState('Titre');

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandespeciales`);
            const body = await resultat.json().catch((error) => {console.log(error)});
                
                if (typeTridemande === "NomClient" || typeTridemande === "Date") {
                   const teste = body.sort((a, b) => b[typeTridemande] > a[typeTridemande] ? -1 : 1)
                 }
                 else if(typeTridemande === "NomClientDesc") {
                    const teste = body.sort((a, b) => b[typeTridemande.substring(0,9)] > a[typeTridemande.substring(0,9)] ? 1 : -1);
                 }
                 else{
                    const teste = body.sort((a, b) => b[typeTridemande.substring(0,4)] > a[typeTridemande.substring(0,4)] ? 1 : -1)
                 }
                 setListePieces(body);
            console.log(typeTridemande);           
        };
        chercherDonnees();
    }, [test]);


    useEffect(() => {
        const triListDemande = type => {
            const types = {
                Date: 'Date',
                NomClient: 'NomClient',
                DateDesc: 'Date',
                NomClientDesc: 'NomClient',
            };
            const proprieteTri = types[type];
            const listTempDemande = listeDemandesSpeciales.slice();
            var listTrierDemande = undefined;
            if (typeTridemande === "NomClient" || typeTridemande === "Date") {
               listTrierDemande = listTempDemande.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? -1 : 1)
            }
            else {
                listTrierDemande = listTempDemande.sort((a, b) => b[proprieteTri] > a[proprieteTri] ? 1 : -1)
            }
            setListePieces(listTrierDemande);
           
        }
        triListDemande(typeTridemande);
        
      
    }, [typeTridemande]);


    return (
        <>
             <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                        <option value="Date">Date</option>
                        <option value="NomClient">NomClient</option>
                        <option value="DateDesc">DateDesc</option>
                        <option value="NomClientDesc">NomClientDesc</option>
                    </select>    
            <ListeDemandesSpecialesAdmin demandesSpeciales={listeDemandesSpeciales} setTest={setTest} />
        </>
    );
}

export default PageAdminDemandeSpeciale;