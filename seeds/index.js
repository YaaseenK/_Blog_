const sequelize = require('../config/connection');
const Post = require('../models/Post');
const seedPostdata = require('./post-seeds.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true })
  await seedPostdata();

  process.exit(0);
};

seedDatabase();
