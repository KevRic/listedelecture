import { React, useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormulaireAjouterPiece({ id }) {
    const { t } = useTranslation();
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [categorieArray, setCategorieArray] = useState([]);
    const [alertCategorie, setAlertCategorie] = useState("");
    const [alertColor, setAlertColor] = useState("light");

    const envoyerFormulaire = async () => {

        if (artiste.length > 1 && titre.length > 1 && categorieArray.length > 0) {
            await fetch(`/api/pieces/ajouter`, {
                method: 'post',
                body: JSON.stringify({ Titre: titre, Artiste: artiste, Categorie: categorieArray }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
        }
        else {
            setAlertCategorie("Pièce incomplète ... veuillez entrer des champs valides.");
            setAlertColor("danger");
        }


    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

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

    return (
        <>
            {AfficherRedirection()}
            <Alert variant={alertColor}>{alertCategorie}</Alert>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>{t('piece.titre')}:</Form.Label>
                    <Form.Control type="text" value={titre}
                        onChange={(event) => setTitre(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('piece.artiste')}:</Form.Label>
                    <Form.Control type="text" value={artiste}
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('piece.categories')}:</Form.Label>
                    <Form.Control type="text" value={categorie}
                        onChange={(event) => setCategorie(event.target.value)} />
                </Form.Group>

                <Button variant="primary mr-2" onClick={() => AjouterCategorie()} >
                {t('bouton.ajouter')}
            </Button>
                <Button variant="warning" onClick={() => setCategorieArray([])} >
                {t('bouton.resetcategories')}
            </Button>
            </Form>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>{t('piece.titre')}:</Form.Label><br />
                    <Form.Label>{titre}</Form.Label>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('piece.artiste')}:</Form.Label><br />
                    <Form.Label>{artiste}</Form.Label>
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('piece.categories')}:</Form.Label><br />
                    <Form.Label>{categorieArray.map((catego) => <p key={catego}>{catego}</p>)}</Form.Label>
                </Form.Group>

                <Button variant="primary" onClick={envoyerFormulaire} >
                {t('bouton.ajouternouvellepiece')}
            </Button>

            </Form>
        </>
    );
}

export default FormulaireAjouterPiece;