import React from 'react';
import { AuditProvider } from './context/AuditContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientDetailPage from './pages/PatientDetailPage';
import AuditLogPage from './pages/AuditLogPage';
import AnalyticsPage from './pages/AnalyticsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <AuditProvider>
        <PatientProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="patients" element={<Navigate to="/dashboard" replace />} />
                <Route path="patients/:id" element={<PatientDetailPage />} />
                <Route path="audit" element={<AuditLogPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route index element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </Router>
        </PatientProvider>
      </AuditProvider>
    </AuthProvider>
  );
}

export default App;