import React from 'react';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AfficherListePiecesTrieParTitreOuArtiste({ listePieces }) {

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
                            listePieces.map((piece, key) => {
                                let categorie = piece.Categorie;
                                return (
                                    <tr key={piece._id}>

                                        <td >{piece.Titre}</td>
                                        <td>{piece.Artiste}</td>
                                        <td>
                                            {categorie.map((catego, key) =>
                                                <p key={catego}>{catego}</p>
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

export default AfficherListePiecesTrieParTitreOuArtiste;





