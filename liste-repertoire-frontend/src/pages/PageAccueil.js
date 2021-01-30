import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

function PageAccueil() {
    return (
        

<Container fluid>
<Alert  variant="dark">
                <h1>Page accueil</h1>
            </Alert>

            <img src="./rock.jpg"  className="img-fluid" alt="Rock_Img"></img>
            <p className="mt-3" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis et mauris tristique ornare. Proin ante diam, aliquam ac libero vitae, finibus fermentum est. Quisque metus neque, vestibulum quis ante vulputate, elementum blandit arcu. Quisque ut magna mi. Nulla fringilla auctor commodo. Sed condimentum ipsum purus, eu efficitur lorem interdum molestie. Nam posuere augue magna, eget varius quam pulvinar ac. Etiam eget eros ultrices tellus condimentum sollicitudin.</p>
  
</Container>
            
        
    );
}

export default PageAccueil;