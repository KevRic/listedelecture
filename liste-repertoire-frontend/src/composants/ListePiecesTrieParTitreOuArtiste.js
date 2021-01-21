import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function ListePiecesTrieParTitreOuArtiste({ listePieces }) {


    return (
        <Row>
            <Col>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Artiste</th>
                            <th>Categorie</th>
                            <th>Manipulation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listePieces.map((piece,key) => {
                                let categorie = piece.Categorie;
                                return (
                                    <tr >

                                        <td  key={piece._id}>{piece.Titre}</td>
                                        <td>{piece.Artiste}</td>
                                        <td>
                                            {categorie.map((catego) =>
                                                <p>{catego}</p>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/modifier/${piece._id}`}>
                                                <Button variant="success" className="mr-2" size="sm" >Modifier</Button>
                                            </Link>
                                            <Link to={`/supprimer/${piece._id}`}>
                                                <Button variant="danger" className="mr-2" size="sm" >Supprimer</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                );

                            })}
                    </tbody>
                </Table>
            </Col>
        </Row>

    );




}

export default ListePiecesTrieParTitreOuArtiste;





