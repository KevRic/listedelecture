import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

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





