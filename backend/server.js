const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const certificateRoutes = require('./routes/certificateRoutes');

const app = express();

// CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:5173',
  
  'https://despaclasses.netlify.app' // Replace with your Netlify URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      // If you want to allow all origins in production, use this:
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', certificateRoutes);



// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Certificate Management API',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      ownerLogin: 'POST /api/login',
      uploadCertificate: 'POST /api/upload (Owner only)',
      getCertificate: 'GET /api/certificate/:rollNo',
      getAllCertificates: 'GET /api/certificates (Owner only)',
      deleteCertificate: 'DELETE /api/certificate/:id (Owner only)'
    }
  });
});

// Database connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.log('MongoDB connection error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});