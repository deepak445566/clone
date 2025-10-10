const express = require('express');
const router = express.Router();
const {
  ownerLogin,
  uploadCertificate,
  getCertificate,
  getAllCertificates,
  deleteCertificate
} = require('../controllers/certificateController');
const { authenticateOwner } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/login', ownerLogin);
router.get('/certificate/:rollNo', getCertificate);

// Owner protected routes
router.post('/upload', authenticateOwner, upload.single('certificate'), uploadCertificate);
router.get('/certificates', authenticateOwner, getAllCertificates);
router.delete('/certificate/:id', authenticateOwner, deleteCertificate);

module.exports = router;