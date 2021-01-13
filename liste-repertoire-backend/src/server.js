import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

app.use(bodyParser.json());

const utiliserDB = async(operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('listedelecture');

        await operations(db);
        client.close();
    } catch (erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

app.get('/api/pieces', (requete, reponse) => {
    utiliserDB(async(db) => {
        const listePieces = await db.collection('pieces').find({}).sort({ Categorie: 1 }).toArray();
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );;
});

app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async(db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        reponse.status(200).json(infoPiece);
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
});

app.post('/api/pieces/ajouter', (requete, reponse) => {
    const { Titre, Artiste, Categorie } = requete.body;

    if (Titre !== undefined && Artiste !== undefined && Categorie !== undefined) {
        utiliserDB(async(db) => {
            await db.collection('pieces').insertOne({
                Titre: Titre,
                Artiste: Artiste,
                Categorie: Categorie
            });

            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );;
    } else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${Titre}
            - artiste: ${Artiste}
            - categorie: ${Categorie}`);
    }
});

app.put('/api/pieces/modifier/:id', (requete, reponse) => {
    const { Titre, Artiste, Categorie } = requete.body;
    const id = requete.params.id;

    if (Titre !== undefined && Artiste !== undefined && Categorie !== undefined) {
        utiliserDB(async(db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    Titre: Titre,
                    Artiste: Artiste,
                    Categorie: Categorie
                }
            });

            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );
    } else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${Titre}
            - artiste: ${Artiste}
            - categorie: ${Categorie}`);
    }
});

app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async(db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });

        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );
});

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));