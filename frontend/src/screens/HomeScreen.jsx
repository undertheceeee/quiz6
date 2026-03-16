import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listServices } from '../actions/serviceActions';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);

  return (
    <section className="py-4">
      <div className="container">
        <h2 className="mb-4 text-pink">Auto Repair & Diagnostic Services</h2>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {services.map((service) => (
              <Col key={service.id}>
                <Card className="shadow-sm h-100 pink-card">
                  {service.sample_image ? (
                    <Card.Img
                      variant="top"
                      src={service.sample_image}
                      alt={service.service_name}
                      className="card-image"
                    />
                  ) : (
                    <div className="card-image-placeholder">Image Coming Soon</div>
                  )}
                  <Card.Body>
                    <Card.Title>{service.service_name}</Card.Title>
                    <Card.Text className="text-muted">
                      {service.description?.slice(0, 90)}...
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-pink"> {service.rating ?? '4.5'} | Auto Service</span>
                      <Link
                        to={`/service/${service.id}`}
                        className="btn btn-sm btn-outline-pink"
                      >
                        View Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  );
}
