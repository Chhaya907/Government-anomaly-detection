import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
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
import PublicReports from '../pages/reports/PublicReports';
import Revisions from '../pages/revisions/Revisions';
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
        {/* Role-Specific Dashboards */}
        <Route
          path="/dashboard/mospi"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI]}>
              <MoSPIDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/district"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DISTRICT]}>
              <DistrictDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/auditor"
          element={
            <ProtectedRoute allowedRoles={[ROLES.AUDITOR]}>
              <AuditorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mp"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MP]}>
              <MPDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/citizen"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CITIZEN]}>
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Feature Routes */}
        {/* Projects (Publicly accessible with role-masked columns) */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* Public Reports for Citizen & all roles */}
        <Route path="/public-reports" element={<PublicReports />} />

        {/* Anomaly Cases (Confidential: MoSPI, District Officer, Auditor only) */}
        <Route
          path="/cases"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.DISTRICT, ROLES.AUDITOR]}>
              <Cases />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.DISTRICT, ROLES.AUDITOR]}>
              <CaseDetails />
            </ProtectedRoute>
          }
        />

        {/* Contractor Watch & Cartel Analysis (MoSPI, Auditor only) */}
        <Route
          path="/vendors"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.AUDITOR]}>
              <Vendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors/:id"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.AUDITOR]}>
              <VendorDetails />
            </ProtectedRoute>
          }
        />

        {/* Project Revisions & Audit Log (MoSPI Admin reviews, District Officer submits) */}
        <Route
          path="/revisions"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.DISTRICT]}>
              <Revisions />
            </ProtectedRoute>
          }
        />

        {/* Internal Statutory Audit Reports (MoSPI, District, Auditor, MP) */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI, ROLES.DISTRICT, ROLES.AUDITOR, ROLES.MP]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* System Settings & Model Sensitivity (MoSPI Admin only) */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={[ROLES.MOSPI]}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export default AppRoutes;
