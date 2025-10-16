import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const UserSearch = () => {
  const [rollNo, setRollNo] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollNo.trim()) return;
    
    setLoading(true);
    setError('');
    setCertificate(null);

    try {
      const response = await axios.get(API_ENDPOINTS.getCertificate(rollNo));
      if (response.data.success) {
        setCertificate(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Certificate not found. Please check the roll number and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificate) {
      const link = document.createElement('a');
      link.href = certificate.certificateUrl;
      link.download = `certificate_${certificate.rollNo}.${getFileExtension(certificate.certificateUrl)}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getFileExtension = (url) => {
    return url.split('.').pop().split('?')[0];
  };

  const getFileType = (url) => {
    const ext = getFileExtension(url).toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    return 'file';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex flex-col">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CertiVerify
                </h1>
                <p className="text-xs text-gray-500">Secure Certificate Portal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/owner/login')}
              className="group relative bg-white border border-purple-200 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            >
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Owner Portal</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 lg:p-6">
        <div className="w-full max-w-4xl">
          {!certificate ? (
            /* Search Interface */
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 lg:p-10 border border-white/20">
              {/* Hero Section */}
              <div className="text-center mb-8 lg:mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                  Verify Your Certificate
                </h1>
                <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                  Enter your roll number to instantly access and download your verified certificate
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="Enter your roll number (e.g., 2024001)"
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 bg-white/50 backdrop-blur-sm shadow-lg"
                      required
                      disabled={loading}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !rollNo.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg min-w-[140px]"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Search</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="max-w-2xl mx-auto mb-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
                <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">Secure</h3>
                  <p className="text-blue-700 text-sm">Verified & tamper-proof certificates</p>
                </div>

                <div className="bg-green-50/50 border border-green-200 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-900 mb-1">Instant</h3>
                  <p className="text-green-700 text-sm">Quick access within seconds</p>
                </div>

                <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-purple-900 mb-1">Download</h3>
                  <p className="text-purple-700 text-sm">Save in high quality format</p>
                </div>
              </div>
            </div>
          ) : (
            /* Certificate Found Interface */
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 lg:p-10 border border-white/20">
              {/* Success Header */}
              <div className="text-center mb-8 lg:mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Certificate Verified!
                </h1>
                <p className="text-gray-600 text-lg">Your certificate has been successfully verified and is ready for download</p>
              </div>

              {/* Certificate Details */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
                {/* Student Information */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Student Information</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                        <p className="text-xl font-semibold text-gray-800 bg-white/50 p-3 rounded-xl border border-gray-200">
                          {certificate.name}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Roll Number</label>
                        <p className="text-xl font-semibold text-gray-800 bg-white/50 p-3 rounded-xl border border-gray-200 font-mono">
                          {certificate.rollNo}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Issue Date</label>
                        <p className="text-lg font-semibold text-gray-800 bg-white/50 p-3 rounded-xl border border-gray-200">
                          {new Date(certificate.uploadDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Certificate Preview</span>
                  </h3>

                  <div className="flex items-center justify-center min-h-[200px] lg:min-h-[300px]">
                    {getFileType(certificate.certificateUrl) === 'image' ? (
                      <div className="text-center">
                        <img
                          src={certificate.certificateUrl}
                          alt={`Certificate of ${certificate.name}`}
                          className="max-w-full max-h-64 rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300"
                        />
                        <p className="text-sm text-gray-500 mt-3">Click download to get full resolution</p>
                      </div>
                    ) : getFileType(certificate.certificateUrl) === 'pdf' ? (
                      <div className="text-center p-6">
                        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-semibold mb-2">PDF Certificate</p>
                        <p className="text-sm text-gray-500">High-quality printable document</p>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-semibold mb-2">Certificate File</p>
                        <p className="text-sm text-gray-500">Download to view your certificate</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={handleDownload}
                  className="group flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-1 sm:flex-none"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Certificate
                </button>
                
                <button
                  onClick={() => {
                    setCertificate(null);
                    setRollNo('');
                    setError('');
                  }}
                  className="group flex items-center justify-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-1 sm:flex-none"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Search Another
                </button>
              </div>

              {/* Verification Status */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-green-800 text-lg">Verified & Authentic</span>
                </div>
                <p className="text-green-700 text-sm">
                  This certificate has been officially issued and digitally verified by our institution. 
                  It contains security features to prevent tampering and ensure authenticity.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">CertiVerify</p>
                <p className="text-gray-500 text-sm">Secure Certificate System</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">
                &copy; 2024 Despa Classes. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with ❤️ for student success
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserSearch;