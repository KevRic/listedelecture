import { React, useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormulaireModifierPiece({ id }) {
    const { t } = useTranslation();
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [categorieArray, setCategorieArray] = useState([]);
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
        if (artiste.length > 1 && titre.length > 1 && categorieArray.length > 0) {
            await fetch(`/api/pieces/modifier/${id}`, {
                method: 'put',
                body: JSON.stringify({ Titre: titre, Artiste: artiste, Categorie: categorieArray }),

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
        }
        else {
            setAlertCategorie(`${t('pageadministrateur.erreurpieceincomplete')}.`);
            setAlertColor("danger");
        }

    };

    function AjouterCategorie() {
        if (!categorieArray.some(x => x.toLowerCase() === categorie.toLowerCase())) {
            if (categorie.length < 1) {
                setAlertCategorie(`${t('pageadministrateur.erreurCategorie')}...`);
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
            setAlertCategorie(`${t('pageadministrateur.erreurcategorie2')}...`);
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
            setAlertCategorie(`${t('pageadministrateur.erreurcategorie3')}...`);
            setAlertColor("danger");
        }

    };
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Alert variant={alertColor}>{alertCategorie}</Alert>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>{t('piece.titre')}</Form.Label>
                    <Form.Control type="text" value={titre}
                        onChange={(event) => setTitre(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>{t('piece.artiste')}:</Form.Label>
                    <Form.Control type="text" value={artiste}
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label >{t('piece.categories')}:</Form.Label>
                    <Form.Control type="text" value={categorie}
                        onChange={(event) => setCategorie(event.target.value)} />

                </Form.Group>

                <Button variant="primary mr-2" onClick={() => AjouterCategorie()} >
                {t('bouton.ajouter')}
            </Button>
                <Button variant="danger" onClick={() => SupprimerAncienCategorie()} >
                {t('bouton.retirer')}
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
                {t('bouton.modifierpiece')}
            </Button>

            </Form>
        </>
    );
}

export default FormulaireModifierPiece;