import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { register } from '../actions/userActions';

export default function SignUp() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    location: '',
    gender: '',
    password: '',
    confirm_password: '',
  });
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error, loading } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setValidationError('Passwords do not match.');
      return;
    }
    setValidationError('');
    dispatch(register(form));
  };

  return (
    <section className="py-5">
      <div className="container" style={{ maxWidth: 550 }}>
        <div className="card shadow-sm pink-card">
          <div className="card-body">
            <h2 className="card-title text-pink">Create an account</h2>
            {validationError && <div className="alert alert-warning">{validationError}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={form.username}
                  onChange={handleChange('username')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={form.phone_number}
                  onChange={handleChange('phone_number')}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={form.first_name}
                  onChange={handleChange('first_name')}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={form.last_name}
                  onChange={handleChange('last_name')}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  value={form.location}
                  onChange={handleChange('location')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={form.gender} onChange={handleChange('gender')}>
                  <option value="">Choose...</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.confirm_password}
                  onChange={handleChange('confirm_password')}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="pink" className="w-100" disabled={loading}>
                {loading ? 'Creating account…' : 'Register'}
              </Button>
              <div className="mt-3 text-center">
                Already have an account? <Link to="/signin">Sign In</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
