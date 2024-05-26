const express = require('express');
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


router.get('/blog', authenticateUser('user'), async (req, res) => {
    try {
        const { keywords, authors, sortOrder } = req.query;

        let query = {};
        if (keywords) {
            const keywordArray = keywords.split(' ');
            const keywordRegexArray = keywordArray.map(keyword => new RegExp(keyword, 'i'));
            query.$or = [
                { title: { $in: keywordRegexArray } },
                { content: { $in: keywordRegexArray } }
            ];
        }
        if (authors) {
            query.owner = { $in: authors.split(' ') };
        }


        const searchResults = await BlogPost.find(query)
            .sort({ avgrating: sortOrder == 'desc' ? -1 : 1 })
            .exec();

        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
