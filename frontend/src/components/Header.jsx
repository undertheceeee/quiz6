import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { signout } from '../actions/userActions';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSignin);

  const signoutHandler = () => {
    dispatch(signout());
    navigate('/');
  };

  return (
    <Navbar bg="pink" variant="dark" expand="lg" className="navbar-pink">
      <div className="container">
        <Navbar.Brand as={Link} to="/" className="text-pink fw-bold">
          Pinky&Bluey Car Care
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fa fa-home me-1" /> Home
            </Nav.Link>
            {userInfo && userInfo.role === 'seller' && (
              <Nav.Link as={Link} to="/seller/dashboard">
                <i className="fa fa-box-open me-1" /> Dashboard
              </Nav.Link>
            )}
            {userInfo && userInfo.role === 'admin' && (
              <Nav.Link as={Link} to="/admin/users">
                <i className="fa fa-users me-1" /> Users
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown title={userInfo.username} id="username">
                <NavDropdown.Item as={Link} to="/profile">
                  <i className="fa fa-user me-1" /> Profile
                </NavDropdown.Item>
                {userInfo.role === 'user' && (
                  <NavDropdown.Item as={Link} to="/apply-seller">
                    <i className="fa fa-user-plus me-1" /> Apply Seller
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signoutHandler}>
                  <i className="fa fa-sign-out-alt me-1" /> Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">
                  <i className="fa fa-sign-in-alt me-1" /> Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <i className="fa fa-user-plus me-1" /> Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
