import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ApplySeller() {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(
        '/api/v1/applications/apply/',
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      setMessage('Application submitted. An admin will review it shortly.');
    } catch (error) {
      setMessage(
        error.response?.data?.detail || 'There was a problem submitting the application.'
      );
    }
    setSubmitting(false);
  };

  return (
    <section className="py-5">
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="card shadow-sm pink-card">
          <div className="card-body">
            <h2 className="text-pink">Apply to Become a Seller</h2>
            <p className="text-muted">
              Once approved, you can create services and manage orders from the seller dashboard.
            </p>
            {message && <div className="alert alert-info">{message}</div>}
            <Form onSubmit={submitHandler}>
              <Button type="submit" variant="pink" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Application'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
