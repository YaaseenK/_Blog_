// Is this a Model, a View, or a Controller? 
// This file is a Controller. 
// What is it responsible for handling?
// It routes commands to the Model and View parts.
const router = require('express').Router();
const {Post, Comment, User} = require('../models');
const withAuth =  require('../utils/auth')

// Homepage route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ 
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { 
        posts ,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    res.status(500).json(err);
  }
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
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username', 'id'],
      },
      {
        model: Comment,
        attributes:['text'],
        order:[
          ['comment_date','ASC']
        ],
        include: {
          model: User,
          attributes: ['username'],
        }
      }
    ]
  });
  console.log(postData);
  // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  const post = postData.get({ plain: true });
  // Then, the 'post' template is rendered and post is passed into the template.
  res.render('post',{
    ...post,
    loggedIn: req.session.loggedIn
  });
  } catch (err) {
      res.status(500).json(err);
  }
});



// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where:  {
        user_id: req.session.userId
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit post
router.get('/edit/:id', async (req, res) => {
   // IDs should only be numbers
    if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");

    return;
}
  try {
  // Search the database for a post with an id that matches params
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username', 'id'],
      },
    ]
  });
  console.log(postData);
  // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  const post = postData.get({ plain: true });
  // Then, the 'post' template is rendered and post is passed into the template.
  res.render('edit',{
    ...post,
    loggedIn: req.session.loggedIn
  });
  } catch (err) {
      res.status(500).json(err);
  }
});

// new post
router.get('/dashboard/newPosts', withAuth, (req, res) => {
  try {
    res.render('newPost',{
    existingPost: false
  });
  } catch (err){
    res.status(500).json(err);
  }
});


router.get('/login', async (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
// }
  res.render('login');
})

router.get('/sign-up', async (req, res) => {

  res.render('signup');
})


module.exports = router;