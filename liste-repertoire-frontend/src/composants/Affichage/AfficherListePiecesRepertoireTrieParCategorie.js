import React from 'react';
import { Row, Col, Table, ListGroup } from 'react-bootstrap';

function AfficherListePiecesRepertoireTrieParCategorie(props) {

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
                                        <tr >
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
}

export default AfficherListePiecesRepertoireTrieParCategorie;








