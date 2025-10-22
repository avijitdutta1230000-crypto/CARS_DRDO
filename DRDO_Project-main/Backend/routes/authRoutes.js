const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import your controller
const authController = require('../controllers/authController');

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Store decoded token data in request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Register route
router.post('/register', authController.registerUser);

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: `Hello user with ID ${req.user.id} and role ${req.user.role}` });
});

module.exports = router;
