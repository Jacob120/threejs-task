import Nav from 'react-bootstrap/Nav';
import styles from './TopBar.module.scss';
import Container from 'react-bootstrap/Container';
import { BsPerson, BsTelephone, BsPersonPlus } from 'react-icons/bs';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  let location = useLocation();
  useEffect(() => {}, [location]);

  return (
    <Container>
      <Nav className={`justify-content-end ${styles.root}`} activeKey='/'>
        <Nav.Item>
          <Nav.Link href='/' style={{ color: '#551E19' }}>
            <BsTelephone /> Call: +0123 456 789
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={styles.test}>
          <Nav.Link
            style={{ color: '#551E19' }}
            href='/about'
            eventKey='link-1'
          >
            About us
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: '#551E19' }} eventKey='link-2'>
            Contact us
          </Nav.Link>
        </Nav.Item>
        {sessionStorage && sessionStorage.getItem('username') ? (
          <div className='d-flex'>
            <Nav.Item>
              <Nav.Link
                href='/profile'
                style={{ color: '#551E19' }}
                eventKey='disabled'
              >
                <BsPerson /> Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href='/logout'
                style={{ color: '#551E19' }}
                eventKey='disabled'
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </div>
        ) : (
          <div className='d-flex'>
            <Nav.Item>
              <Nav.Link
                href='/login'
                style={{ color: '#551E19' }}
                eventKey='disabled'
              >
                <BsPerson /> Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href='/register'
                style={{ color: '#551E19' }}
                eventKey='disabled'
              >
                <BsPersonPlus /> Sign up
              </Nav.Link>
            </Nav.Item>
          </div>
        )}
      </Nav>
    </Container>
  );
};

export default TopBar;
