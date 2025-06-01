import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AuthLayout from './pages/auth/AuthLayout';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ParkingSpots from './pages/dashboard/ParkingSpots';
import ParkingHistory from './pages/dashboard/ParkingHistory';
import Users from './pages/dashboard/Users';
import Settings from './pages/dashboard/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import { getToken } from './services/authService';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4361ee',
      },
      secondary: {
        main: '#3f37c9',
      },
      error: {
        main: '#f72585',
      },
      success: {
        main: '#4cc9f0',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Dashboard Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="parking-spots" element={<ParkingSpots />} />
            <Route path="history" element={<ParkingHistory />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;