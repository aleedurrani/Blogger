const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    ratings: [{
        type: Number
    }],
    avgrating:{
        type:Number
    },
    comments: [{
        type: String
    }],
    disabled: {
        type:Boolean
      }
});

blogPostSchema.index({ title: 'text', content: 'text' });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
