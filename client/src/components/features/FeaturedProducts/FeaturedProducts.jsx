import React from 'react';
import ProductConfigurator from '../../common/ProductBox/ProductConfigurator';

import { Container, Row, Col } from 'react-bootstrap';

const FeaturedProducts = () => {
  // If there would be more products in data to show you can map through them with ProductConfigurator here
  const allProductsData = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container>
      <Row xs={1} md={2} lg={4} className='g-3 '>
        {allProductsData.map((product) => (
          <Col key={product}>
            <ProductConfigurator />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
