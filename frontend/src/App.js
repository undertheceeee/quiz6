import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import ProtectedRoute from './components/ProtectedRoute';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ApplySeller from './screens/ApplySeller';
import UserScreen from './screens/UserScreen';
import SellerDashboard from './screens/SellerDashboard';
import UserProfile from './screens/UserProfile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Container className="py-3">
              <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/service/:id" element={<DetailScreen />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/apply-seller"
                element={
                  <ProtectedRoute allowedRoles={['user', 'seller', 'admin']}>
                    <ApplySeller />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['seller', 'admin']}>
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['user', 'seller', 'admin']}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              </Routes>
            </Container>
          </main>
          <Footer />
          <AIChatbot />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
