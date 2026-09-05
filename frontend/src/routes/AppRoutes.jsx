import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHomeRouteForRole } from '../utils/roleUtils';
import ProtectedRoute from './ProtectedRoute';

// Layout
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import CitizenOTP from '../pages/auth/CitizenOTP';
import RoleSelection from '../pages/auth/RoleSelection';

// Dashboards
import MoSPIDashboard from '../pages/dashboard/MoSPIDashboard';
import DistrictDashboard from '../pages/dashboard/DistrictDashboard';
import AuditorDashboard from '../pages/dashboard/AuditorDashboard';
import MPDashboard from '../pages/dashboard/MPDashboard';
import CitizenDashboard from '../pages/dashboard/CitizenDashboard';

// Features
import Projects from '../pages/projects/Projects';
import ProjectDetails from '../pages/projects/ProjectDetails';
import Cases from '../pages/cases/Cases';
import CaseDetails from '../pages/cases/CaseDetails';
import Vendors from '../pages/vendors/Vendors';
import VendorDetails from '../pages/vendors/VendorDetails';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';

const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getHomeRouteForRole(user?.role)} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public / Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/citizen-otp" element={<CitizenOTP />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      {/* Protected Dashboard & App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Role Dashboards */}
        <Route path="/dashboard/mospi" element={<MoSPIDashboard />} />
        <Route path="/dashboard/district" element={<DistrictDashboard />} />
        <Route path="/dashboard/auditor" element={<AuditorDashboard />} />
        <Route path="/dashboard/mp" element={<MPDashboard />} />
        <Route path="/dashboard/citizen" element={<CitizenDashboard />} />

        {/* Feature Routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseDetails />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
