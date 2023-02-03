const { Post } = require('../models');

const postData = [
  {
    "post_title": "The Benefits of Meditation",
    "post_contents":"AWESOME CONTENT"
  },
  {
    "post_title": "The Benefits of Meditation 2",
    "post_contents":"AWESOME CONTENT 2"
  },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

