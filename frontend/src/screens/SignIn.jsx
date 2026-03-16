import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { signin } from '../actions/userActions';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <section className="py-5">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card shadow-sm pink-card">
          <div className="card-body">
            <h2 className="card-title text-pink">Sign In</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="pink" className="w-100" disabled={loading}>
                {loading ? 'Signing In…' : 'Sign In'}
              </Button>
              <div className="mt-3 text-center">
                New here? <Link to="/signup">Create an account</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
