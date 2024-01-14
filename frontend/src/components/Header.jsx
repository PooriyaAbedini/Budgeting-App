import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, logout } from '../features/users/authSlice'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/header.module.css'

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <Navbar className='headerNav'bg="transparent" variant="dark" expand="lg" data-bs-theme="white">
      <Container>
        <Navbar.Brand className='brand' href="/home">Penny!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.nav} ms-auto`} >
          <Nav.Link className={styles.navLink} href="/expenses">Expenses</Nav.Link>
            <Nav.Link className={styles.navLink} href="/flow-charts">Flow Charts</Nav.Link>
            <Nav.Link className={styles.navLink} href="/category">Settings</Nav.Link>
            <Nav.Link className={styles.navLink} onClick={onLogout} href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
