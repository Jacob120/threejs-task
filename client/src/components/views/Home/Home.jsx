import React from 'react';

import FeaturedProducts from '../../features/FeaturedProducts/FeaturedProducts';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <div>
      <Container>
        <FeaturedProducts />
      </Container>
    </div>
  );
};

export default Home;
