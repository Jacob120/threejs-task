import React, { useContext } from 'react';
import CartContext from '../../../context/CartContext';

import styles from './CartPage.module.scss';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
} from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  console.log('cartpage', cart);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className={'pb-5 ' + styles.root}>
      <h2 className={'text-center ' + styles.header}>Shopping Cart</h2>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
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
                          onClick={() => removeFromCart(product.product.id)}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
