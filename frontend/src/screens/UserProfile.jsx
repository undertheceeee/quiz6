import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.userSignin);
  const authHeader = useMemo(() => userInfo ? { Authorization: `Bearer ${userInfo.access}` } : {}, [userInfo]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [profileRes, ordersRes] = await Promise.all([
        axios.get('/api/v1/users/profile/', { headers: authHeader }),
        axios.get('/api/v1/orders/history/', { headers: authHeader }),
      ]);
      setProfile(profileRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Unable to load profile or orders.');
    }
    setLoading(false);
  }, [authHeader]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <section className="py-4">
      <div className="container">
        <h2 className="mb-4 text-pink">My Profile</h2>
        {loading ? (
          <div className="text-center py-4">Loading…</div>
        ) : (
          <>
            <Card className="mb-4 shadow-sm pink-card">
              <Card.Body>
                <h5 className="text-pink">Personal Information</h5>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>First Name:</strong> {profile.first_name}</p>
                <p><strong>Last Name:</strong> {profile.last_name}</p>
                <p><strong>Phone:</strong> {profile.phone_number}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Role:</strong> {profile.role}</p>
              </Card.Body>
            </Card>
            <h4 className="text-pink mb-3">My Orders</h4>
            <Table responsive bordered hover className="table-pink">
              <thead className="table-light">
                <tr>
                  <th>Service</th>
                  <th>Price Paid</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.service}</td>
                    <td>${order.price_paid}</td>
                    <td>{new Date(order.date_purchased).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </section>
  );
}
