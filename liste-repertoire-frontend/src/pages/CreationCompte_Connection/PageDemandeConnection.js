import { React } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageConnection() {
    const { t } = useTranslation();
    return (
        <Container fluid>

            <Alert variant={"dark"} className="mt-3">
                <h1>{t('avertissementaccespage')}</h1>
            </Alert>

            <Row>
                <Link to="pageConnection" className="btn btn-link pr-0">{t('connecter')}</Link>
                <Link to="pageRegistre" className="btn btn-link pr-0">{t('creecompte')}</Link>
            </Row>
        </Container>
    );
}

export default PageConnection;