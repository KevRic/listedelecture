import { React, useState } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


function FormulaireModifierDemandeSpeciale(props) {
    var listePieces = props.listePieces;
    var piecesDebutModification = props.piecesDebutModification;
    const [estPremierAffichage, setPremierAffichage] = useState(true);

    function MAJpiecesClient(e, value) {

        if (estPremierAffichage) {
            setPremierAffichage(false);
        }
        var piecesTemp = props.pieces.slice();
        if (e.target.checked) {
            piecesTemp.push(value);
            props.setPieces(piecesTemp);
        }
        else {
            piecesTemp = piecesTemp.filter(p => p.Titre !== value.Titre && p.Artiste !== value.Artiste);
            props.setPieces(piecesTemp);
        }


        var equal = false;
        if (piecesTemp.length === piecesDebutModification.length) {
            equal = VerifierArrayEquals(piecesDebutModification, piecesTemp);
        }


        (equal === false && piecesTemp.length > 0) ? props.setEtatbuttonSoumettre(false) : props.setEtatbuttonSoumettre(true);


    }
    function VerifierArrayEquals(array1, array2) {
        let retour = false;
        if (array1.length === array2.length) {
            var existe = false;
            for (let index = 0; index < array1.length; index++) {

                existe = array2.some(piece => (piece.Titre === array1[index].Titre && piece.Artiste === array1[index].Artiste));
                if (existe === false) {
                    return false;
                }
            }
            retour = existe ? true : false;
        }
        else {
            retour = false;
        }
        return retour;
    }

    function VerifierCheck(value) {
        let etatRetour = false;
        if (estPremierAffichage) {
            if (props.pieces?.length) {
                props.pieces.forEach(
                    piece => {
                        if (piece.Titre === value.Titre && piece.Artiste === value.Artiste) {

                            etatRetour = true;
                        }
                    }
                )
            }
        }
        else {
            etatRetour = undefined;
        }

        return etatRetour;
    }


    return (
        <>
            <h5>Sélectionner les pièces voulues pour modifier votre demande spéciale</h5>
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
                                    <td key={index + 1}>{index + 1}</td>
                                    <td key={piece.Titre}>{piece.Titre}</td>
                                    <td key={piece.Artiste}>{piece.Artiste}</td>
                                    <td key={piece.Categorie}>
                                        {piece.Categorie.map((catego) =>
                                            <p key={catego}>{catego}</p>
                                        )}
                                    </td>
                                    <td key={piece} className="text-center"><Form.Check type="checkbox" defaultChecked={VerifierCheck(piece)} id={piece} onClick={(e) => MAJpiecesClient(e, piece)} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default FormulaireModifierDemandeSpeciale;