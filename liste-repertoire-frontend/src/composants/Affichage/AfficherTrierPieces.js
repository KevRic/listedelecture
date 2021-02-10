import { React } from 'react';
import { useTranslation } from 'react-i18next';

function AfficherTrierPieces(props) {
        const { t } = useTranslation();


        return (
                <>
                        {t('trierpar')}:
                        <select className="ml-2" value={props.typeTridemande} onChange={(e) => props.setTridemande(e.target.value)}>
                                <option value="Artiste">{t('artisteasc')}</option>
                                <option value="Titre">{t('titreasc')}</option>
                                <option value="Categorie">{t('categorieasc')}</option>
                                <option value="TitreDesc">{t('titredesc')}</option>
                                <option value="ArtisteDesc">{t('artistedesc')}</option>
                                <option value="CategorieDesc">{t('categoriedesc')}</option>
                        </select>
                </>
        )
}

export default AfficherTrierPieces;