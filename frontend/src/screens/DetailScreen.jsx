import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsService } from '../actions/serviceActions';
import axios from 'axios';

export default function DetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [booking, setBooking] = React.useState(false);
  const [bookingSuccess, setBookingSuccess] = React.useState('');
  const [bookingError, setBookingError] = React.useState('');

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;
  const { userInfo } = useSelector((state) => state.userSignin);

  useEffect(() => {
    dispatch(detailsService(id));
  }, [dispatch, id]);

  const handleBook = async () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    setBooking(true);
    setBookingError('');
    setBookingSuccess('');
    try {
      const { data } = await axios.post(
        '/api/v1/orders/create/',
        {
          service: id,
          paypal_transaction_id: `tx_${Math.random().toString(36).slice(2, 12)}`,
          price_paid: service.price,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.access}` },
        }
      );
      setBookingSuccess('Booking successful! Check your profile for order details.');
    } catch (err) {
      setBookingError(err.response?.data?.detail || 'Unable to book service at this time.');
    }
    setBooking(false);
  };

  return (
    <section className="py-4">
      <div className="container">
        <Link to="/" className="btn btn-sm btn-outline-pink mb-3">
          ← Back to services
        </Link>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <Row>
            <Col md={6} className="mb-3">
              {service.sample_image ? (
                <img
                  src={service.sample_image}
                  alt={service.service_name}
                  className="img-fluid rounded shadow-sm"
                />
              ) : (
                <div className="placeholder-image">No image available</div>
              )}
            </Col>
            <Col md={6}>
              <h2 className="text-pink">{service.service_name}</h2>
              <p className="text-muted">{service.description}</p>
              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Service Type:</strong> Auto Repair & Diagnostic
                </li>
                <li>
                  <strong>Rating:</strong> {service.rating ?? '4.5'} 
                </li>
                <li>
                  <strong>Price:</strong> ${service.price}
                </li>
                <li>
                  <strong>Duration:</strong> {service.duration_of_service}
                </li>
                <li>
                  <strong>Expert:</strong> {service.seller_name}
                </li>
              </ul>
              <Button variant="pink" className="me-2">
                Book with PayPal
              </Button>
              <Button variant="outline-pink" onClick={handleBook} disabled={booking}>
                {booking ? 'Booking…' : 'Confirm Booking'}
              </Button>
              {bookingError && <div className="alert alert-danger mt-3">{bookingError}</div>}
              {bookingSuccess && <div className="alert alert-success mt-3">{bookingSuccess}</div>}
              <Button variant="outline-pink">Message Seller</Button>
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
}
