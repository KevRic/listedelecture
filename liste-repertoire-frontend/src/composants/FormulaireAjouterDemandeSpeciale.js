import { React } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

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
                                    <td key={index + 1}>{index + 1}</td>
                                    <td key={piece.Titre}>{piece.Titre}</td>
                                    <td key={piece.Artiste}>{piece.Artiste}</td>
                                    <td key={piece.Categorie}>
                                        {piece.Categorie.map((catego) =>
                                            <p key={catego}>{catego}</p>
                                        )}
                                    </td>
                                    <td key={piece} className="text-center"><Form.Check type="checkbox" id={piece} onClick={(e) => MAJpiecesClient(e, piece)} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Form>
        </>
    );
}

export default FormulaireAjouterDemandeSpeciale;