// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import SubDistributorPage from './pages/SubDistributorPage';
import SalesRepPage from './pages/SalesRepPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile.role);
      }
    };
    fetchUserRole();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/sub-distributor" element={<PrivateRoute><SubDistributorPage /></PrivateRoute>} />
        <Route path="/sales-rep" element={<PrivateRoute><SalesRepPage /></PrivateRoute>} />
        <Route
          path="/dashboard"
          element={
            role === 'admin' ? (
              <Navigate to="/admin" />
            ) : role === 'sub-distributor' ? (
              <Navigate to="/sub-distributor" />
            ) : (
              <Navigate to="/sales-rep" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


// Example in Login.js
const handleLogin = async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signIn({ email, password });
  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        setError('Incorrect email or password. Please try again.');
        break;
      case 'User not confirmed':
        setError('Please verify your email before logging in.');
        break;
      default:
        setError('An unexpected error occurred. Please try again later.');
    }
    setMessage(null);
  } else {
    setError(null);
    setMessage("Login successful!");
  }
};
