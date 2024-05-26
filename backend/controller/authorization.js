const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
        username, 
        email, 
        password: hashedPassword,
        role,
        disabled:false
    });
    await user.save();
    res.status(201).json({ 
        message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(400).json({ 
        error: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json(
        {error: 'Invalid credentials'}
    );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({error: 'Invalid credentials'});
    }
    if(user.disabled){
        return res.status(401).json(
            {error: 'User is disabled'}
        );
    }
    const token = jwt.sign(
        { userId: user._id, role: user.role}, 
        'secret-key',
        {
      expiresIn: '1h',
        }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
