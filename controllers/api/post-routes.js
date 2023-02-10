const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

// route to create/add a post
router.post('/', async (req, res) => {
    try { 
      const postData = await Post.create({
        post_title: req.body.post_title,
        post_contents: req.body.post_contents,
        user_id: req.session.userId
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
          user_id: req.session.userId
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

  router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId
            }
        })

        // If no post found matching post and user IDs return message
        if (!postData) {
            res.status(404).json({ message: "No post found with that ID" });
            
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
})

  module.exports = router;