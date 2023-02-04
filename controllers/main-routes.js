// Is this a Model, a View, or a Controller? 
// This file is a Controller. 
// What is it responsible for handling?
// It routes commands to the Model and View parts.
const router = require('express').Router();
const Post = require('../models/Post');

// Homepage route
router.get('/', async (req, res) => {
  const postData = await Post.findAll().catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { posts });
    });


// // get one post with serialized data
router.get('/post/:id', async (req, res) => {
   // IDs should only be numbers
   if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");

    return;
}
  try {
  // Search the database for a post with an id that matches params
  const postData = await Post.findByPk(req.params.id);
  console.log(postData);
  // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  const post = postData.get({ plain: true });
  // Then, the 'post' template is rendered and post is passed into the template.
  res.render('post', post);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Dashboard
router.get('/dashboard', async (req, res) => {
  const postData = await Post.findAll().catch((err) => { 
    res.json(err);
  });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts });
});


// Here is where we provide hardcoded data to render dynamically
// const posts = [
//   {
//     id: 1,
//     post_title: 'THE BLOG',
//     post_context: 'awesome ARTICLE'
//   },
//   {
//     id: 2,
//     post_title: 'THE NAME 2ss',
//     post_context: 'awesome ARTICLE 2 '
//   }
// ];





// Add a comment describing the purpose of the 'get' route
// GET route for getting all of the dishes that are on the menu
// router.get('/', async (req, res) => {
//   // Add a comment describing the purpose of the render method
//   // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
//   res.render('all', {posts});
// });


// // get one Post
// router.get('/post/:num', async (req, res) => {
//   return res.render('post', posts[req.params.num - 1]);
// });

// get one post without serializing data

module.exports = router;
