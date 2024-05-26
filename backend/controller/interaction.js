const express = require('express');
const User = require('../models/User'); 
const BlogPost= require('../models/BlogPost'); 
const jwt = require('jsonwebtoken');

const router= express.Router();

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
          return res.status(403).json({ error: 'Only user can follow' });
        }
        req.user = decodedToken;
        next();
      });
    };
};

router.post('/follow/:username', authenticateUser('user') ,async (req, res) => {
    try {
      const { username } = req.params;
      const currentUser = await User.findById(req.user.userId);
      const userToFollow = await User.findOne({ username });

      if (!currentUser.following.includes(userToFollow.username)) {
        currentUser.following.push(userToFollow.username);
        await currentUser.save();
        userToFollow.notifications.push(currentUser.username+" started following you.");
        await userToFollow.save();
      }
      

      res.status(200).json({ message: 'Successfully followed the user.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/unfollow/:username', authenticateUser('user'),async (req, res) => {
    try {
      const { username } = req.params;
      const currentUser = await User.findById(req.user.userId);
      const userToUnfollow = await User.findOne({ username });
  
      currentUser.following.pull(userToUnfollow.username);
      await currentUser.save();
      res.status(200).json({ message: 'Successfully unfollowed the user.' });
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
});

router.get('/feed', authenticateUser('user'),async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.userId);
      const followingUserusernames = currentUser.following;
      const posts = await BlogPost.find({$and: [{ disabled: false },{ owner: { $in: followingUserusernames } }]});
      res.status(200).json(posts);

    } catch (error) {
      res.status(500).json({ error:  error.message });
    }
  });

router.get('/notifications', authenticateUser('user'),async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.userId);
  
      res.status(200).json(currentUser.notifications);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
});

module.exports = router;