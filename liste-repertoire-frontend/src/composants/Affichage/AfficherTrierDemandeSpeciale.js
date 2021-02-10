import { React } from 'react';
import { useTranslation } from 'react-i18next';

function AfficherTrierDemandeSpeciale({ setTridemande }) {
    
    const { t } = useTranslation();

    return (
        <>
            Trier:
            <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                <option value="DateDesc">{t('datedesc')}</option>
                <option value="Date">{t('dateasc')}</option>
                <option value="NomClientDesc">{t('clientdesc')}</option>
                <option value="NomClient">{t('clientasc')}</option>
            </select>
        </>
    )
}

export default AfficherTrierDemandeSpeciale;