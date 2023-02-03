// Is this a Model, a View, or a Controller? 
// This file is a Controller. 
// What is it responsible for handling?
// It routes commands to the Model and View parts.
const router = require('express').Router();

// Here is where we provide hardcoded data to render dynamically
const posts = [
  {
    id: 1,
    post_title: 'THE BLOG',
    post_context: 'awesome ARTICLE'
  },
  {
    id: 2,
    post_title: 'THE NAME 2ss',
    post_context: 'awesome ARTICLE 2 '
  }
];





// Add a comment describing the purpose of the 'get' route
// GET route for getting all of the dishes that are on the menu
router.get('/', async (req, res) => {
  // Add a comment describing the purpose of the render method
  // This method is rendering the 'all' Handlebars.js template. This is how we connect each route to the correct template.
  res.render('all', {posts});
});


// get one dish
router.get('/post/:num', async (req, res) => {
  return res.render('post', posts[req.params.num - 1]);
});

module.exports = router;
