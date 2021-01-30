import React from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

function ListePieces(props) {
    var listePieces = props.listePieces;

    if (props.typeTridemande === "Categorie" || props.typeTridemande === "CategorieDesc") {

        var dictionnaireCategories = Object();

        listePieces.forEach(piece => {
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
                    const piecesAssociees = listePieces.filter((piece) => piece.Categorie.includes(categorie));
                    return (
                        <Row>
                            <Col>
                                <ListGroup  >
                                    <ListGroup.Item variant="dark" style={{ textAlign: "center", fontSize: "25px" }} className="mt-2">{categorie}</ListGroup.Item>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Artiste</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                piecesAssociees.map(piece =>
                                                    <tr key={piece._id}>
                                                        <td >{piece.Titre}</td>
                                                        <td>{piece.Artiste}</td>
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
                <Form className="mb-1">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Artiste</th>
                                <th>Catégorie</th>
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

export default ListePieces;