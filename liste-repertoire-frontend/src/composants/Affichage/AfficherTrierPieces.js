import { React } from 'react';
import { useTranslation } from 'react-i18next';

function AfficherTrierPieces(props) {
        const { t } = useTranslation();

        return (
                <>
                        {t('trier.trierpar')}:
                        <select className="ml-2" value={props.typeTridemande} onChange={(e) => props.setTridemande(e.target.value)}>
                                <option value="Artiste">{t('trier.artisteasc')}</option>
                                <option value="Titre">{t('trier.titreasc')}</option>
                                <option value="Categorie">{t('trier.categorieasc')}</option>
                                <option value="TitreDesc">{t('trier.titredesc')}</option>
                                <option value="ArtisteDesc">{t('trier.artistedesc')}</option>
                                <option value="CategorieDesc">{t('trier.categoriedesc')}</option>
                        </select>
                </>
        )
}

export default AfficherTrierPieces;