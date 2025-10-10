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
    setLoading(true);
    setError('');
    setCertificate(null);

    try {
   const response = await axios.get(API_ENDPOINTS.getCertificate(rollNo));
      
      if (response.data.success) {
        setCertificate(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Certificate not found');
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
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    return 'file';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Certificate Verification</h1>
            </div>
            <button
              onClick={() => navigate('/owner/login')}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Owner Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 -mt-16">
        <div className="max-w-2xl w-full">
          {!certificate ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              {/* Hero Section */}
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Verify Your Certificate
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Enter your roll number to search and download your certificate
              </p>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="Enter your roll number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition disabled:opacity-50 font-medium"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </div>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg max-w-md mx-auto">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Enter your exact roll number as provided by your institution
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Certificate Found!</h1>
                <p className="text-gray-600 mt-2">Here are your certificate details</p>
              </div>

              {/* Certificate Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Student Name</label>
                    <p className="text-lg font-semibold text-gray-800">{certificate.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Roll Number</label>
                    <p className="text-lg font-semibold text-gray-800">{certificate.rollNo}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Issue Date</label>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(certificate.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Certificate Preview */}
                <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                  {getFileType(certificate.certificateUrl) === 'image' ? (
                    <img
                      src={certificate.certificateUrl}
                      alt={`Certificate of ${certificate.name}`}
                      className="max-w-full max-h-64 rounded-lg shadow-md"
                    />
                  ) : getFileType(certificate.certificateUrl) === 'pdf' ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">PDF Certificate</p>
                      <p className="text-sm text-gray-500 mt-1">Click download to view</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Certificate File</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Search Another
                </button>
              </div>

              {/* Verification Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  <strong>Verified Certificate:</strong> This certificate has been officially issued and verified by our institution.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2024 Your Coaching Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserSearch;