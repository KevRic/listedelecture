import { React } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

function FormulaireAjouterDemandeSpeciale(props) {
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

                {categories.map((categorie, key) => {
                    const piecesAssociees = props.listePieces.filter((piece) => piece.Categorie.includes(categorie));
                    return (
                        <Row key={categorie}>
                            <Col>
                                <ListGroup  >
                                    <ListGroup.Item variant="dark" style={{ textAlign: "center", fontSize: "25px" }} className="mt-2">{categorie}</ListGroup.Item>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Artiste</th>
                                                <th>Sélection</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                piecesAssociees.map(piece =>
                                                    <tr key={piece._id}>
                                                        <td >{piece.Titre}</td>
                                                        <td>{piece.Artiste}</td>
                                                        <td className="text-center"><Form.Check type="checkbox" checked={VerifierCheck(piece)} id={piece} onChange={(e) => MAJpiecesClient(e, piece)} /></td>
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
                <h5>Sélectionner les pièces à ajouter à votre nouvelle demande spéciale</h5>
                <Form className="mb-1">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Artiste</th>
                                <th>Catégorie</th>
                                <th className="text-center">Sélection</th>
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