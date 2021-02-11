import { React } from 'react';
import { useTranslation } from 'react-i18next';

function AfficherTrierDemandeSpeciale({ setTridemande }) {
    
    const { t } = useTranslation();

    return (
        <>
            {t('trierdemandespeciale.trierpar')}:
            <select className="ml-2" onChange={(e) => setTridemande(e.target.value)}>
                <option value="DateDesc">{t('trierdemandespeciale.datedesc')}</option>
                <option value="Date">{t('trierdemandespeciale.dateasc')}</option>
                <option value="NomClientDesc">{t('trierdemandespeciale.clientdesc')}</option>
                <option value="NomClient">{t('trierdemandespeciale.clientasc')}</option>
            </select>
        </>
    )
}

export default AfficherTrierDemandeSpeciale;