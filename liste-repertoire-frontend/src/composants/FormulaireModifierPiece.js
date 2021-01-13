import {
    React,
    useState,
    useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'


function FormulaireModifierPiece({ id }) {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [categorieArray, setCategorieArray] = useState([]);
    const [etatButtonsoumette, setEtatbuttonSoumettre] = useState(false);
    const [alertCategorie, setAlertCategorie] = useState("");
    const [alertColor, setAlertColor] = useState("light");

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces/${id}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setTitre(body.Titre);
            setArtiste(body.Artiste);
            setCategorieArray(body.Categorie);
        };
        chercherDonnees();
    }, [id]);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/modifier/${id}`, {
            method: 'put',
            body: JSON.stringify({ Titre: titre, Artiste: artiste, Categorie: categorieArray }),

            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };


    function AjouterCategorie() {
        if (!categorieArray.some(x => x.toLowerCase() === categorie.toLowerCase())) {
            if (categorie.length < 1) {
                setAlertCategorie("La Catégorie ne peut pas contenir 0 caractère....");
                setAlertColor("danger");
            }
            else {
                var categorieTemp = categorieArray.slice();
                categorieTemp.push(categorie);
                setCategorieArray(categorieTemp);
                setCategorie("");
                setAlertCategorie("");
                setAlertColor("light");
            }
        }
        else {
            setAlertCategorie("La catégorie existe déjà....");
            setAlertColor("danger");
        }
    }

    function SupprimerAncienCategorie() {

        if (categorieArray.some(x => x.toLowerCase() === categorie.toLowerCase())) {
            var categorieTemp = categorieArray.filter(c => c !== categorie)
            setCategorieArray(categorieTemp);
            setCategorie("");
            setAlertCategorie("");
            setAlertColor("light")
        }
        else {
            setAlertCategorie("La catégorie n'existe pas....");
            setAlertColor("danger");
        }


        //document.getElementById(val).disabled = false;
    };
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    useEffect(() => {
        const test = () => {
            if (artiste.length > 1 && titre.length > 1 && categorieArray.length > 0) {
                setEtatbuttonSoumettre(false);
            }
            else {
                setEtatbuttonSoumettre(true);
            }
        }
        test();
    }, [titre, artiste, categorieArray])
    return (
        <>
            {AfficherRedirection()}
            <Alert variant={alertColor}>{alertCategorie}</Alert>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Titre</Form.Label>
                    <Form.Control type="text" value={titre}
                        onChange={(event) => setTitre(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Artiste / Groupe</Form.Label>
                    <Form.Control type="text" value={artiste}
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >Catégorie</Form.Label>
                    <Form.Control type="text" value={categorie}
                        onChange={(event) => setCategorie(event.target.value)} />

                </Form.Group>

                <Button variant="primary mr-2" onClick={() => AjouterCategorie()} >
                    Ajouter
            </Button>
                <Button variant="danger" onClick={() => SupprimerAncienCategorie()} >
                    Supprimer
            </Button>
            </Form>

            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Titre:</Form.Label><br />
                    <Form.Label>{titre}</Form.Label>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Artiste / Groupe</Form.Label><br />
                    <Form.Label>{artiste}</Form.Label>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Catégorie</Form.Label><br />
                    <Form.Label>{categorieArray.map((catego) => <p>{catego}</p>)}</Form.Label>
                </Form.Group>

                <Button variant="primary" disabled={etatButtonsoumette} onClick={envoyerFormulaire} >
                    Modifier
            </Button>

            </Form>
        </>
    );
}

export default FormulaireModifierPiece;