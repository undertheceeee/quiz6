import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal, Nav, Table, Tab } from 'react-bootstrap';
import axios from 'axios';

export default function UserScreen() {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalValue, setModalValue] = useState('');

  const { userInfo } = useSelector((state) => state.userSignin);

  const authHeader = useMemo(() => userInfo ? { Authorization: `Bearer ${userInfo.access}` } : {}, [userInfo]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, appsRes] = await Promise.all([
        axios.get('/api/v1/users/admin/users/', { headers: authHeader }),
        axios.get('/api/v1/applications/list/', { headers: authHeader }),
      ]);
      setUsers(usersRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to load users.');
    }
    setLoading(false);
  }, [authHeader]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approve = async (id) => {
    const application = applications.find((app) => app.id === id);
    setSelectedApplication(application);
    setModalMode('approve');
    setModalValue('');
    setModalVisible(true);
  };

  const decline = async (id) => {
    const application = applications.find((app) => app.id === id);
    setSelectedApplication(application);
    setModalMode('decline');
    setModalValue('');
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setModalMode('');
    setSelectedApplication(null);
    setModalValue('');
  };

  const submitModal = async () => {
    if (!selectedApplication) return;

    if (!modalValue.trim()) return;

    const id = selectedApplication.id;
    try {
      if (modalMode === 'approve') {
        await axios.put(
          `/api/v1/applications/${id}/approve/`,
          { merchant_id: modalValue },
          { headers: authHeader }
        );
        setMessage('Seller approved successfully.');
      } else if (modalMode === 'decline') {
        await axios.put(
          `/api/v1/applications/${id}/decline/`,
          { decline_reason: modalValue },
          { headers: authHeader }
        );
        setMessage('Application declined.');
      }
      loadData();
      handleModalClose();
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to submit.');
    }
  };

  return (
    <section className="py-4">
      <div className="container">
        <h2 className="mb-4 text-pink">Admin User Management</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <Tab.Container defaultActiveKey="users">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="users">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="applications">Seller Applications</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="users">
              {loading ? (
                <div className="text-center py-4">Loading…</div>
              ) : (
                <Table responsive bordered hover className="table-pink">
                  <thead className="table-light">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="applications">
              {loading ? (
                <div className="text-center py-4">Loading…</div>
              ) : (
                <Table responsive bordered hover className="table-pink">
                  <thead className="table-light">
                    <tr>
                      <th>User</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.user}</td>
                        <td>{app.status}</td>
                        <td>{new Date(app.created_at).toLocaleString()}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            onClick={() => approve(app.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => decline(app.id)}
                          >
                            Decline
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <Modal show={modalVisible} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === 'approve' ? 'Approve Seller' : 'Decline Application'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                {modalMode === 'approve'
                  ? 'Enter Merchant ID for seller:'
                  : 'Enter reason for declining:'}
              </Form.Label>
              <Form.Control
                value={modalValue}
                onChange={(e) => setModalValue(e.target.value)}
                placeholder={
                  modalMode === 'approve'
                    ? 'Merchant ID'
                    : 'Decline reason'
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitModal}>
              {modalMode === 'approve' ? 'Approve' : 'Decline'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </section>
  );
}
