import { React } from 'react';
import { Form, Table, Row, Col, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
function FormulaireAjouterDemandeSpeciale(props) {
    const { t } = useTranslation();
    var listePieces = props.listePieces;

    function MAJpiecesClient(e, value) {

        var piecesTemp = props.pieces.slice();
        if (e.target.checked) {
            piecesTemp.push(value);
            props.setPieces(piecesTemp);
        }
        else {
            piecesTemp = piecesTemp.filter(p => p._id !== value._id);
            props.setPieces(piecesTemp);
        }

        piecesTemp.length > 0 ? props.setEtatbuttonSoumettre(false) : props.setEtatbuttonSoumettre(true);

    }

    function VerifierCheck(value) {
        let etatRetour = false;

        if (props.pieces?.length) {
            props.pieces.forEach(
                piece => {
                    if (piece.Titre === value.Titre && piece.Artiste === value.Artiste) {

                        etatRetour = true;
                    }
                }
            )
        }
        return etatRetour;
    }

    if (props.typeTridemande === "Categorie" || props.typeTridemande === "CategorieDesc") {

        var dictionnaireCategories = Object();

        props.listePieces.forEach(piece => {
            piece.Categorie.forEach(cat => {
                if (dictionnaireCategories[cat] === undefined) {
                    dictionnaireCategories[cat] = true;
                }
            })
        });

        const categories = Object.keys(dictionnaireCategories);

        if (props.typeTridemande === "CategorieDesc") {
            categories.sort().reverse();
        }
        else {
            categories.sort();
        }

        return (
            <>
                <h5>{t('pageajouterDS.titre2')}</h5>
                {categories.map((categorie) => {
                    const piecesAssociees = props.listePieces.filter((piece) => piece.Categorie.includes(categorie));
                    return (
                        <Row key={categorie}>
                            <Col>
                                <ListGroup  >
                                    <ListGroup.Item variant="dark" style={{ textAlign: "center", fontSize: "25px" }} className="mt-2">{categorie}</ListGroup.Item>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>{t('piece.titre')}</th>
                                                <th>{t('piece.artiste')}</th>
                                                <th>{t('pageajouterDS.titreselection')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                piecesAssociees.map((piece, key) =>
                                                    <tr key={piece.Titre}>
                                                        <td>{piece.Titre}</td>
                                                        <td>{piece.Artiste}</td>
                                                        <td className="text-center"><Form.Check type="checkbox" checked={VerifierCheck(piece)} id={key} onChange={(e) => MAJpiecesClient(e, piece)} /></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </ListGroup>
                            </Col>
                        </Row>
                    )
                })}
            </>
        );
    } else {

        return (
            <>
                <h5>{t('pageajouterDS.titre2')}</h5>
                <Form className="mb-1">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{t('piece.titre')}</th>
                                <th>{t('piece.artiste')}</th>
                                <th>{t('piece.categories')}</th>
                                <th className="text-center">{t('pageajouterDS.titreselection')}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listePieces.map((piece, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{piece.Titre}</td>
                                        <td>{piece.Artiste}</td>
                                        <td>
                                            {piece.Categorie.map((catego) =>
                                                <p key={catego}>{catego}</p>
                                            )}
                                        </td>
                                        <td className="text-center"><Form.Check type="checkbox" checked={VerifierCheck(piece)} id={piece} onChange={(e) => MAJpiecesClient(e, piece)} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Form>
            </>
        );
    }
}

export default FormulaireAjouterDemandeSpeciale;