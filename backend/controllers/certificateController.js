const Certificate = require('../models/Certificate');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Owner Login
const ownerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === process.env.OWNER_USERNAME && password === process.env.OWNER_PASSWORD) {
      const token = jwt.sign(
        { username: username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.json({ 
        success: true, 
        message: 'Login successful', 
        token 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error' 
    });
  }
};

// Upload Certificate
const uploadCertificate = async (req, res) => {
  try {
    const { name, rollNo } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'Certificate file is required' 
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'certificates',
      resource_type: 'auto'
    });

    // Save to database
    const certificate = new Certificate({
      name,
      rollNo,
      certificateUrl: result.secure_url,
      publicId: result.public_id
    });

    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'Certificate uploaded successfully',
      data: certificate
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Certificate with this roll number already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error uploading certificate'
    });
  }
};

// Get Certificate by Roll Number (Public)
const getCertificate = async (req, res) => {
  try {
    const { rollNo } = req.params;

    const certificate = await Certificate.findOne({ rollNo });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        error: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      data: certificate
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching certificate'
    });
  }
};

// Get All Certificates (Owner only)
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ uploadDate: -1 });
    
    res.json({
      success: true,
      count: certificates.length,
      data: certificates
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching certificates'
    });
  }
};

// Delete Certificate
const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        error: 'Certificate not found'
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(certificate.publicId);

    // Delete from database
    await Certificate.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error deleting certificate'
    });
  }
};

module.exports = {
  ownerLogin,
  uploadCertificate,
  getCertificate,
  getAllCertificates,
  deleteCertificate
};