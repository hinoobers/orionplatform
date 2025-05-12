const { Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../controller/databaseController');

const Post = sequelize.define(
    'posts',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        likedBy: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        comments: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        created: {
            type: DataTypes.DATE,
            allowNull: true
        },
    });

module.exports = Post;