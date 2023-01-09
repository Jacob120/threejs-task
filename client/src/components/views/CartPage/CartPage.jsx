import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../context/CartContext';
import { API_URL } from '../../../config';

import styles from './CartPage.module.scss';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleSendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL + 'api/send-mail', {
        method: 'POST',
        body: JSON.stringify({
          cart: cart,
          email: userEmail,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);

      setLoading(false);
      sessionStorage.setItem('cart', JSON.stringify([]));
    }
  };

  console.log(isSuccess);

  return (
    <div className={'pb-5 ' + styles.root}>
      <h2 className={'text-center ' + styles.header}>Shopping Cart</h2>

      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        {isSuccess && (
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You order summary have been sent on your email!</p>
          </Alert>
        )}
        {error && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error.. Please try again!</p>
          </Alert>
        )}
        {loading && (
          <Spinner animation='border' role='status' className='d-block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
        <Row>
          <Col xs={12} md={12} lg={9}>
            <Table className='text-center'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Material</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              {cart &&
                cart.map((product, index) => (
                  <tbody key={index}>
                    <tr>
                      <td className='col-2 py-5 '>{product.product.name}</td>
                      <td className='col-2 py-5 '>{product.material}</td>
                      <td className='col-2 py-5 '>${product.product.price}</td>
                      <td className='col-2  py-5 '>{product.quantity}</td>
                      <td className='col-2  py-5 '>
                        ${product.product.price * product.quantity}
                      </td>
                      <td className='col-1  py-5'>
                        <Button
                          variant='outline-dark'
                          size='sm'
                          onClick={() => removeFromCart(product)}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
          <Col xs={12} md={12} lg={3} className={styles.right_box}>
            <p className={'p-3 ' + styles.summary_title}>Cart Total</p>
            <h5 className={'p-3 mb-3 ' + styles.summary_title}>
              Total: ${totalPrice} ({totalQuantity} items)
            </h5>
            <Form onSubmit={(e) => handleSendMail(e)} className='p-3'>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type='email'
                  placeholder='Enter email'
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant='outline-secondary' type='submit'>
                Send Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
