const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

const authenticateUser = (requiredRole) => {
    return (req, res, next) => {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json({ error: 'There is no token' });
      }
      jwt.verify(token, 'secret-key', (err, decodedToken) => {
        if (err) {
          return res.status(402).json({ error: 'Token verificaion is failed' });
        }
        if (requiredRole && decodedToken.role !== requiredRole) {
          return res.status(403).json({ error: 'Only admin can access this' });
        }
        req.user = decodedToken;
        next();
      });
    };
};

router.get('/profile', authenticateUser('user'), async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


router.put('/profile', authenticateUser('user'), async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { username, email, password: hashedPassword },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
