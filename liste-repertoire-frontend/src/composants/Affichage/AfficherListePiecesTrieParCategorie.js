import React from 'react';
import { Button, Row, Col, Table, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AfficherListePiecesTrieParCategorie(props) {

    const { t } = useTranslation();

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
                                            <th>{t('piece.titre')}</th>
                                            <th>{t('piece.artiste')}</th>
                                            <th>{t('pageadministrateur.titremanipulation')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            piecesAssociees.map(piece =>
                                                <tr key={piece._id}>
                                                    <td >{piece.Titre}</td>
                                                    <td>{piece.Artiste}</td>
                                                    <td><Link to={`/modifier/${piece._id}`}>
                                                        <Button variant="success" className="m-1" size="sm" >{t('bouton.modifier')}</Button>
                                                    </Link>
                                                        <Link to={`/supprimer/${piece._id}`}>
                                                            <Button variant="danger" className="m-1" size="sm" >{t('bouton.supprimer')}</Button>
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

export default AfficherListePiecesTrieParCategorie;








