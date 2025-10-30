import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    address: ""
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "ba2c15d0-aced-4c33-a33d-b0cc04c7d17b",
          ...formData
        }),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("✅ Form submitted successfully! We'll contact you soon.");
        setFormData({
          name: "",
          fatherName: "",
          phone: "",
          address: ""
        });
      } else {
        setStatus("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus("❌ Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">GET IN TOUCH</span>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent big">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your journey? Fill out the form and we'll get back to you within 
              <span className="text-cyan-400 font-semibold"> 24 hours</span>.
            </p>
          </div>

          <div className="grid  gap-8 items-center">
           

            {/* Right Side - Contact Form */}
            <div className="">
              <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                {status && (
                  <div className={`mb-8 p-4 rounded-2xl text-center font-medium backdrop-blur-lg ${
                    status.includes("✅") 
                      ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}>
                    {status}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                          placeholder="Enter your full name"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Father's Name */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Father's Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                          placeholder="Enter father's name"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                        placeholder="Enter your phone number"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Complete Address *
                    </label>
                    <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-lg resize-none"
                        placeholder="Enter your complete address with city, state, and zip code"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 px-8 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-2xl hover:shadow-cyan-500/25"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Your Request...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    )}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <p className="text-center text-gray-400 text-sm">
                    🔒 Your information is secure and encrypted. We never share your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;