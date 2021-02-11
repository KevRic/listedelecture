import React from 'react';
import { Alert, Container, Carousel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function PageAccueil() {
    const { t } = useTranslation();

    return (
        <Container fluid>
            <Alert variant="dark">
                <h1>{t('pageaccueil.titre')}</h1>
            </Alert>

            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src="./rock.jpg" alt="First slide" />
                    <Carousel.Caption>
                        <h3>Metallica</h3>
                        <p>{t('pageaccueil.descConcert1')}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="./Rock_Concert.jpg" alt="Third slide" />

                    <Carousel.Caption>
                        <h3>System Of A Down</h3>
                        <p>{t('pageaccueil.descConcert1')}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="./Twenty_One_Pilots.jpg" alt="Third slide" />

                    <Carousel.Caption>
                        <h3>Twenty One Pilots</h3>
                        <p>{t('pageaccueil.descConcert1')}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <p className="mt-3" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>

        </Container>
    );
}

export default PageAccueil;