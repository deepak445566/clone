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
        const fileInput = document.getElementById('certificate');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed. Please try again.');
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
      if (error.response?.status === 401) {
        localStorage.removeItem('ownerToken');
        navigate('/owner/login');
      }
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;

    try {
      const token = localStorage.getItem('ownerToken');
      const response = await axios.delete(API_ENDPOINTS.deleteCertificate(id), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setMessage('Certificate deleted successfully!');
        fetchCertificates();
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Delete failed. Please try again.');
    }
  };

  useEffect(() => {
    if (activeTab === 'view') {
      fetchCertificates();
    }
  }, [activeTab]);

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className=" text-sm  lg:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  CertifyPro
                </h1>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className=" text-xs lg:text-sm font-medium text-white">Welcome back,</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-1 p-2">
            {['upload', 'view'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-lg font-medium text-sm capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-white bg-gradient-to-r from-purple-600/50 to-cyan-600/50 shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'upload' ? '📤 Upload Certificate' : '📋 View Certificates'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-6 p-4 rounded-xl backdrop-blur-lg border ${
            message.includes('success') 
              ? 'bg-green-500/10 border-green-400/30 text-green-300'
              : 'bg-red-500/10 border-red-400/30 text-red-300'
          }`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {message.includes('success') ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              {message}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Upload New Certificate</h2>
              <p className="text-gray-400">Add student certificates to the system</p>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  👤 Student Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={uploadData.name}
                  onChange={handleUploadChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-lg"
                  placeholder="Enter student full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rollNo" className="block text-sm font-medium text-gray-300">
                  🔢 Roll Number *
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={uploadData.rollNo}
                  onChange={handleUploadChange}
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-lg"
                  placeholder="Enter unique roll number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-300">
                  📄 Certificate File *
                </label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/5">
                  <input
                    type="file"
                    id="certificate"
                    name="certificate"
                    onChange={handleUploadChange}
                    required
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-cyan-400 file:text-white hover:file:from-purple-600 hover:file:to-cyan-500 transition-all duration-300"
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Supported formats: JPG, PNG, PDF (Max: 5MB)
                </p>
                {uploadData.certificate && (
                  <p className="text-sm text-cyan-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Selected: {uploadData.certificate.name} ({(uploadData.certificate.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !uploadData.name || !uploadData.rollNo || !uploadData.certificate}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 flex items-center justify-center font-semibold"
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
                  '🚀 Upload Certificate'
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">📋 All Certificates</h2>
                <p className="text-gray-400 mt-1">
                  {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} in system
                </p>
              </div>
              <button
                onClick={fetchCertificates}
                className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 border border-white/10 hover:border-white/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              {certificates.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {certificates.map((cert) => (
                      <tr key={cert._id} className="hover:bg-white/5 transition-colors duration-300">
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{cert.name}</div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="text-sm text-cyan-400 font-mono bg-black/30 px-3 py-1 rounded-lg inline-block">
                            {cert.rollNo}
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-400">
                            {new Date(cert.uploadDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-1 bg-cyan-500/10 px-3 py-2 rounded-lg hover:bg-cyan-500/20"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>View</span>
                          </a>
                          <button
                            onClick={() => handleDeleteCertificate(cert._id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300 flex items-center space-x-1 bg-red-500/10 px-3 py-2 rounded-lg hover:bg-red-500/20"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No certificates found</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Start by uploading your first certificate using the upload tab above.
                  </p>
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