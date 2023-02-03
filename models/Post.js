// HERE IS WHERE WE SET UP OUT USER MODEL // -> 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        ,
        post_contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'

});

module.exports = Post;