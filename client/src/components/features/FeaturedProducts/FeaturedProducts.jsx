import React, { useContext } from 'react';
import CartContext from '../../../context/CartContext';
import ProductConfigurator from '../../common/ProductBox/ProductConfigurator';

import styles from './FeaturedProducts.module.scss';
import { Container, Row, Col } from 'react-bootstrap';

const FeaturedProducts = () => {
  // If there would be more products in data to show you can map through them with ProductConfigurator here
  const allProductsData = [
    { id: 1, name: 'Table 1', price: 45, oldPrice: 65 },
    { id: 2, name: 'Table 2', price: 45, oldPrice: 65 },
    { id: 3, name: 'Table 3', price: 45, oldPrice: 65 },
    { id: 4, name: 'Table 4', price: 45, oldPrice: 65 },
    { id: 5, name: 'Table 5', price: 45, oldPrice: 65 },
    { id: 6, name: 'Table 6', price: 45, oldPrice: 65 },
    { id: 7, name: 'Table 7', price: 45, oldPrice: 65 },
    { id: 8, name: 'Table 8', price: 45, oldPrice: 65 },
  ];

  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className={styles.products_root}>
      <Container>
        <Row xs={1} md={2} lg={4} className='g-3 '>
          {allProductsData.map((product) => (
            <Col key={product.id}>
              <ProductConfigurator {...product} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
