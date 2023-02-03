// HERE IS WHERE WE SET UP OUT BLOG MODEL // -> 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        blog_name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        aritcles: {
        type: DataTypes.TEXT,
        allowNull: true
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
});

module.exports = Blog;