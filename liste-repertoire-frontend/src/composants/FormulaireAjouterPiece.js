import {
    React,
    useState,
    useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireAjouterPiece({ id }) {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [categorieArray, setCategorieArray] = useState([]);
    const [etatButtonsoumette, setEtatbuttonSoumettre] = useState(true);
    const [etatButtonAjouter, setEtatbuttonAjouter] = useState(true);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'post',
            body: JSON.stringify({ Titre: titre, Artiste: artiste, Categorie: categorieArray  }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    function AjouterCategorie(){      
        var categorieTemp = categorieArray.slice();
        categorieTemp.push(categorie);
        setCategorieArray(categorieTemp);
        setCategorie("");
        setEtatbuttonAjouter(true);
        
    }

    useEffect(() => {
        const test = () => {
            if (artiste.length > 1 && titre.length > 1 && categorieArray.length > 0) {
                setEtatbuttonSoumettre(false);
            }
            else{
                setEtatbuttonSoumettre(true);
            }
            
            if(categorie.length > 0)
            {
                setEtatbuttonAjouter(false);
            }
        }
        test();
    }, [titre,artiste,categorie,categorieArray])
    
    return (
    <>
        {AfficherRedirection()}
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
                <Form.Label>Catégorie</Form.Label>
                <Form.Control type="text" value={categorie} 
                    onChange={(event) => setCategorie(event.target.value)} />
            </Form.Group>

            <Button variant="primary mr-2" disabled={etatButtonAjouter}  onClick={() => AjouterCategorie()} >
                Ajouter
            </Button>
            <Button variant="warning"  onClick={() => setCategorieArray([])} >
               Reset Catégorie
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
                Soumettre
            </Button>

                </Form>
    </>
    );
}

export default FormulaireAjouterPiece;