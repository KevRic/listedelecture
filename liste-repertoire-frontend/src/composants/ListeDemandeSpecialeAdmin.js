import React, { Fragment, useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import AfficherDemandesSpecialesAdmin from '../composants/AfficherListeDemandesSpecialesAdmin';


function ListeDemandesSpecialesAdmin() {

    const [demandesSpeciales, setListeDemandes] = useState([]);
    const [compteur, setCompteur] = useState(0); // mis un compteur car je ne veux pas que la liste se rafraichie losqu'ont tri les demandes ligne 33

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandespeciales`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeDemandes(body);
        };
        chercherDonnees();
    }, [compteur]);


    if (demandesSpeciales?.length) {

        return (
            <>
            <AfficherDemandesSpecialesAdmin setCompteur={setCompteur} compteur={compteur} demandesSpeciales={demandesSpeciales} setListeDemandes={setListeDemandes}  />           
            </>
        );


    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de demandes spéciales.</Alert>;
    }
}

export default ListeDemandesSpecialesAdmin;



