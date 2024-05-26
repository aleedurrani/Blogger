const mongoose = require('mongoose');
const cors = require('cors');
const express= require("express");
const bodyParser = require('body-parser');
const authController = require('./controller/authorization');
const userController = require('./controller/user');
const blogController= require('./controller/blogpost');
const interactionController= require('./controller/interaction');
const searchController= require('./controller/search');
const adminController = require('./controller/admin');

const app= express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/user', userController);
app.use('/admin', adminController);
app.use('/blog', blogController);
app.use('/interaction', interactionController);
app.use('/search',searchController);




mongoose.connect('mongodb+srv://i211129:test123@cluster0.0qbifus.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connected to Mongo DB")
}).catch(err=>{
    console.log(err)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });



