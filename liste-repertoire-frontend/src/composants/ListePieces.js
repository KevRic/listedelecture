import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function ListePieces({ listePieces }) {


    return (
        <Row>
            <Col>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Artiste</th>
                            <th>Categorie</th>
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
                                    </tr>
                                );

                            })}
                    </tbody>
                </Table>
            </Col>
        </Row>

    );




}

export default ListePieces;





