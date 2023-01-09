import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../../../context/CartContext';
import ProductConfigurator from '../../common/ProductBox/ProductConfigurator';
import { API_URL } from '../../../config';

import styles from './FeaturedProducts.module.scss';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const FeaturedProducts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API_URL + 'api/products');
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const { cart, addToCart } = useContext(CartContext);

  if (loading) {
    <Spinner animation='border' role='status' className='d-block mx-auto'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>;
  }
  return (
    <div className={styles.products_root}>
      <Container>
        <Row xs={1} md={2} lg={4} className='g-3 '>
          {data &&
            data.map((product) => (
              <Col key={product._id}>
                <ProductConfigurator {...product} addToCart={addToCart} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
