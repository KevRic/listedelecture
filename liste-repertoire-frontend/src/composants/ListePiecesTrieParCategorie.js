import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup'

function ListePiecesTrieParCategorie({ listePieces, typeTri }) {

    var dictionnaireCategories = Object();

    listePieces.forEach(piece => {
        piece.Categorie.map(cat => {
            if (dictionnaireCategories[cat] === undefined) {
                dictionnaireCategories[cat] = true;
            }
        })
    });

    const categories = Object.keys(dictionnaireCategories);

    if (typeTri === "CategorieDesc") {
        categories.sort().reverse();
    }
    else {
        categories.sort();
    }

    return (
        <>
           
            {categories.map((categorie) => {
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
                                            <th>Manipulation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            piecesAssociees.map(piece =>
                                                <tr>
                                                    <td key={piece._id}>{piece.Titre}</td>
                                                    <td>{piece.Artiste}</td>
                                                    <td><Link to={`/modifier/${piece._id}`}>
                                                        <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                                    </Link>
                                                        <Link to={`/supprimer/${piece._id}`}>
                                                            <Button variant="danger" className="m-1" size="sm" >Supprimer</Button>
                                                        </Link></td>
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


}

export default ListePiecesTrieParCategorie;








