const sequelize = require('../config/connection');
const Post = require('../models/Post');
const User = require('../models/User');
const seedPostdata = require('./post-seeds.js');
const seedUserData = require('./user-seeds.js')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })
  await seedUserData();
  await seedPostdata();
 

  process.exit(0);
};

seedDatabase();
