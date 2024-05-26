const express = require('express');
const User= require('../models/User');
const BlogPost = require('../models/BlogPost'); 
const jwt = require('jsonwebtoken');

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
          return res.status(403).json({ error: 'Only user can perform this task' });
        }
        
        req.user = decodedToken;
        next();
      });
    };
};


router.post('/blog-post', authenticateUser('user'), async(req, res) => {
    try {
    const { title, content} = req.body;
    const userid= req.user.userId;
    const user = await User.findById(userid);
    const owner= user.username;
    
    const blogPost = new BlogPost({ 
        title, 
        content, 
        owner, 
        disabled:false
    });
    await blogPost.save();
    res.status(201).json({ 
        message: 'Blog Post created successfully' 
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
});


router.get('/blog-posts', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const blogPosts = await BlogPost.find({ disabled: false }).skip((page - 1) * limit).limit(parseInt(limit));
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put('/blog-post/:id', authenticateUser('user'), async (req, res) => {
    try {
        
        const {id} = req.params;
        const { title, content} = req.body;
        const userid= req.user.userId;
        const user = await User.findById(userid);
        const owner= user.username;

        const existingBlogPost = await BlogPost.findById(id);
        if (!existingBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        if (existingBlogPost.owner !== owner) {
            return res.status(401).json({ error: 'Unauthorized. Owner mismatch' });
        }
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).send(updatedBlogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/blog-post/:id', authenticateUser('user'), async (req, res) => {
    try {
        const { id } = req.params;
    
        const existingBlogPost = await BlogPost.findById(id);
        if (!existingBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const userid = req.user.userId;
        const user = await User.findById(userid);

        res.status(200).json(existingBlogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/blog-post/:id', authenticateUser('user'), async(req, res) => {
    try {
        const {id} = req.params;

        const userid= req.user.userId;
        const user = await User.findById(userid);
        const owner= user.username;

        const existingBlogPost = await BlogPost.findById(id);
        if (!existingBlogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        if (existingBlogPost.owner !== owner) {
            return res.status(401).json({ error: 'Unauthorized. Owner mismatch' });
        }
        await BlogPost.findByIdAndDelete(id);
        res.status(200).send("Post Deleted");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/blog-post/:id/rate', authenticateUser('user'), async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const updatedBlogPost = await BlogPost.findById(id);

        if (!updatedBlogPost) {
        return res.status(404).json({ error: 'Blog post not found.' });
        }
        if(updatedBlogPost.disabled){
        return res.status(401).json({ error: 'Blog post is disabled.' });
        }
        updatedBlogPost.ratings.push(rating);
        await updatedBlogPost.save();

        const sum = updatedBlogPost.ratings.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        updatedBlogPost.avgrating= sum/(updatedBlogPost.ratings.length);
        updatedBlogPost.save();
        
        res.status(200).send(updatedBlogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/blog-post/:id/comment', authenticateUser('user'), async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
       
        const updatedBlogPost = await BlogPost.findById(id);

        if (!updatedBlogPost) {
        return res.status(404).json({ error: 'Blog post not found.' });
        }
        if(updatedBlogPost.disabled){
        return res.status(401).json({ error: 'Blog post is disabled.' });
        }

        updatedBlogPost.comments.push(comment);
        await updatedBlogPost.save();

        const currentUser= await User.findById(req.user.userId);
        const blogpost= await BlogPost.findById(id);
        const username= blogpost.owner;
        const owner= await User.findOne({username});
        owner.notifications.push("Blog Title: "+updatedBlogPost.title+"\n"+currentUser.username+" has commented on your blog: "+comment);
        await owner.save();

        res.status(200).send(updatedBlogPost);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
