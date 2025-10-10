// src/config/api.js
const API_BASE_URL =  'http://localhost:5000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/api/login`,
  upload: `${API_BASE_URL}/api/upload`,
  getCertificate: (rollNo) => `${API_BASE_URL}/api/certificate/${rollNo}`,
  getAllCertificates: `${API_BASE_URL}/api/certificates`,
  deleteCertificate: (id) => `${API_BASE_URL}/api/certificate/${id}`
};

export default API_BASE_URL;