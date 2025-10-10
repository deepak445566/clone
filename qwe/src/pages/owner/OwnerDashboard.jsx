import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';


const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadData, setUploadData] = useState({
    name: '',
    rollNo: '',
    certificate: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    navigate('/owner/login');
  };

  const handleUploadChange = (e) => {
    if (e.target.name === 'certificate') {
      setUploadData({
        ...uploadData,
        certificate: e.target.files[0]
      });
    } else {
      setUploadData({
        ...uploadData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate file size
    if (uploadData.certificate && uploadData.certificate.size > 5 * 1024 * 1024) {
      setMessage('File size too large. Maximum size is 5MB.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', uploadData.name);
    formData.append('rollNo', uploadData.rollNo);
    formData.append('certificate', uploadData.certificate);

    try {
      const token = localStorage.getItem('ownerToken');
      const response = await axios.post(API_ENDPOINTS.upload, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setMessage('Certificate uploaded successfully!');
        setUploadData({ name: '', rollNo: '', certificate: null });
        // Reset file input
        const fileInput = document.getElementById('certificate');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('ownerToken');
      if (!token) {
        navigate('/owner/login');
        return;
      }

      const response = await axios.get(API_ENDPOINTS.getAllCertificates, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.data.success) {
        setCertificates(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      }
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('ownerToken');
      const response = await axios.delete(API_ENDPOINTS.deleteCertificate(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage('Certificate deleted successfully!');
        fetchCertificates(); // Refresh list
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Delete failed. Please try again.');
      console.error('Delete error:', error);
    }
  };

  // Load certificates when viewing tab
  useEffect(() => {
    if (activeTab === 'view') {
      fetchCertificates();
    }
  }, [activeTab]);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Certificate Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            {['upload', 'view'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'upload' ? 'Upload Certificate' : 'View Certificates'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-600'
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {message.includes('success') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {message}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Upload New Certificate</h2>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={uploadData.name}
                  onChange={handleUploadChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter student full name"
                />
              </div>

              <div>
                <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={uploadData.rollNo}
                  onChange={handleUploadChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter unique roll number"
                />
              </div>

              <div>
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate File *
                </label>
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  onChange={handleUploadChange}
                  required
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: JPG, PNG, PDF (Maximum file size: 5MB)
                </p>
                {uploadData.certificate && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {uploadData.certificate.name} ({(uploadData.certificate.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !uploadData.name || !uploadData.rollNo || !uploadData.certificate}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Upload Certificate'
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">All Certificates</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <button
                onClick={fetchCertificates}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              {certificates.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert) => (
                      <tr key={cert._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-mono">{cert.rollNo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(cert.uploadDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900 transition flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </a>
                          <button
                            onClick={() => handleDeleteCertificate(cert._id)}
                            className="text-red-600 hover:text-red-900 transition flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
                  <p className="text-gray-500">Upload your first certificate using the "Upload Certificate" tab.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;