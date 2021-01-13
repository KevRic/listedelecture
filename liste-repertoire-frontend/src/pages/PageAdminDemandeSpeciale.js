import {
    React,
    useState,
    useEffect
} from 'react';

import ListeDemandesSpecialesAdmin from '../composants/ListeDemandeSpecialeAdmin';

function PageAdminDemandeSpeciale() {
    const [listeDemandesSpeciales, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandespeciales`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Liste des Demandes Spéciales</h1>
            <ListeDemandesSpecialesAdmin demandesSpeciales={listeDemandesSpeciales} />
        </>
    );
}

export default PageAdminDemandeSpeciale;