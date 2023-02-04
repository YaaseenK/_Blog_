const router = require('express').Router();
const Post = require('../../models/Post');


// route to create/add a post
router.post('/', async (req, res) => {
    try { 
      const postData = await Post.create({
        post_title: req.body.post_title,
        post_contents: req.body.post_contents,
    });
    // if the post is successfully created, the new response will be returned as json
    res.status(200).json(postData)
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
  });

  // this action method is the controller. it accepts input and sends data to the model and the view.
  router.put('/:id', async (req, res) => {
    // Sending the data to the model so that on post can be updated with new data in the database
    try{
      const updatePost = await Post.update(
        {
          post_title: req.body.post_title,
          post_contents: req.body.post_contents,
        },
        {
          where: {
            id: req.params.id,
          }
        },
      );
      // the updated data is then sent back to handler that dispatched the fetch req 
        res.status(200).json(updatePost)
    }
    catch(err){
      res.status(500).json(err)
    }
  });

  module.exports = router;