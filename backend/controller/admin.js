const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

const authenticateUser = (requiredRole) => {
    return (req, res, next) => {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json({ error: 'There is no token' });
      }
      jwt.verify(token, 'secret-key', (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: 'Token verificaion is failed' });
        }
        if (requiredRole && decodedToken.role !== requiredRole) {
          return res.status(403).json({ error: 'Only admin can access this' });
        }
        req.user = decodedToken;
        next();
      });
    };
};

router.get('/profile', authenticateUser('admin'), async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.put('/profile', authenticateUser('admin'), async (req, res) => {
    try {
      const { username, email,password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { username, email, password:hashedPassword },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.get('/users', authenticateUser('admin'), async(req,res)=>{
    try {
        const users = await User.find({role:'user'});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/disableUser/:id', authenticateUser('admin'), async(req,res)=>{
    const {id} = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, { $set: { disabled: true } }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/restoreUser/:id', authenticateUser('admin'), async(req,res)=>{
    const {id} = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, { $set: { disabled: false } }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blogs', authenticateUser('admin'), async(req,res)=>{
    try {
        const blogs = await BlogPost.find();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blog/:id', authenticateUser('admin'), async(req,res)=>{
    const {id} = req.params;

    try {
        const blog = await BlogPost.findById(id);
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/disableBlog/:id', authenticateUser('admin'), async(req,res)=>{
    const {id} = req.params;

    try {
        const blog = await BlogPost.findByIdAndUpdate(id, { $set: { disabled: true } }, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/restoreBlog/:id', authenticateUser('admin'), async(req,res)=>{
    const {id} = req.params;

    try {
        const blog = await BlogPost.findByIdAndUpdate(id, { $set: { disabled: false } }, { new: true });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports=router;