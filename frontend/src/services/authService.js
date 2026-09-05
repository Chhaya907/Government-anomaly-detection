import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
  /**
   * Login with email/credentials
   */
  async login(credentials) {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Register new official or citizen
   */
  async register(userData) {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  /**
   * Request OTP for citizen login
   */
  async sendCitizenOTP(mobileNumber) {
    const response = await api.post(API_ENDPOINTS.AUTH.SEND_OTP, { mobile: mobileNumber });
    return response.data;
  },

  /**
   * Verify citizen OTP
   */
  async verifyCitizenOTP(mobileNumber, otp) {
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { mobile: mobileNumber, otp });
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Request password reset link
   */
  async forgotPassword(email) {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  /**
   * Fetch current authenticated user
   */
  async getCurrentUser() {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  /**
   * Logout user and clear storage
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;
