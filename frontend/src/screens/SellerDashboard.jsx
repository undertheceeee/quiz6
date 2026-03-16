import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import axios from 'axios';

export default function SellerDashboard() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    service_name: '',
    description: '',
    price: '',
    duration_of_service: '',
    sample_image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { userInfo } = useSelector((state) => state.userSignin);
  const authHeader = useMemo(() => userInfo ? { Authorization: `Bearer ${userInfo.access}` } : {}, [userInfo]);

  const loadServices = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/v1/services/manage/', { headers: authHeader });
      setServices(data);
    } catch (error) {
      setMessage('Unable to load services.');
    }
  }, [authHeader]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleChange = (field) => (e) => {
    if (field === 'sample_image') {
      setForm({ ...form, [field]: e.target.files[0] });
    } else {
      setForm({ ...form, [field]: e.target.value });
    }
  };

  const submitService = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    try {
      await axios.post('/api/v1/services/manage/', formData, {
        headers: { ...authHeader, 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Service added successfully.');
      setForm({
        service_name: '',
        description: '',
        price: '',
        duration_of_service: '',
        sample_image: null,
      });
      setShowForm(false);
      loadServices();
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to add service.');
    }
    setLoading(false);
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await axios.delete(`/api/v1/services/manage/${id}/`, { headers: authHeader });
      setMessage('Service deleted.');
      loadServices();
    } catch (error) {
      setMessage('Unable to delete service.');
    }
  };

  return (
    <section className="py-4">
      <div className="container">
        <h2 className="mb-4 text-pink">Seller Dashboard</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <Button
          variant="pink"
          className="mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Service'}
        </Button>
        {showForm && (
          <Card className="mb-4 shadow-sm pink-card">
            <Card.Body>
              <Form onSubmit={submitService}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Service Name</Form.Label>
                      <Form.Control
                        value={form.service_name}
                        onChange={handleChange('service_name')}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange('price')}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.description}
                    onChange={handleChange('description')}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    value={form.duration_of_service}
                    onChange={handleChange('duration_of_service')}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sample Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleChange('sample_image')}
                    accept="image/*"
                  />
                </Form.Group>
                <Button type="submit" variant="pink" disabled={loading}>
                  {loading ? 'Adding…' : 'Add Service'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
        <Table responsive bordered hover className="table-pink">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.service_name}</td>
                <td>${service.price}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteService(service.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
}
