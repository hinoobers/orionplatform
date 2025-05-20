const { verifyToken } = require('./authenticationController');
const pool = require('./databaseController');
const { sendUpdatePacket } = require('./socketController');

const User = require("../models/UserModel");
const Post = require('../models/PostModel');

const getAll = async () => {
    const posts = await Post.findAll();
    if (posts.length === 0) {
        return {
            success: false,
            message: 'No posts found',
            statusCode: 404
        };
    }

    const postsWithUsername = await Promise.all(
        posts.map(async (post) => {
            const user = await User.findOne({ where: { id: post.createdBy } });
            return {
                ...post.get({ plain: true }), 
                username: user ? user.username : null, 
            };
        })
    );

    return {
        success: true,
        total: postsWithUsername.length,
        posts: postsWithUsername
    };
};

const tweet = async (token, title, content) => {
    const tokenResult = await verifyToken(token);
    console.log(tokenResult, token);
    if (!tokenResult.success) {
        return {
            success: false,
            message: 'Invalid token',
            statusCode: 401
        }
    }

    if(!title || !content) {
        return {
            success: false,
            message: 'Title and content are required',
            statusCode: 400
        }
    }

    if(title.length > 50) {
        return {
            success: false,
            message: 'Title is too long',
            statusCode: 400
        }
    }

    if(content.length > 500) {
        return {
            success: false,
            message: 'Content is too long',
            statusCode: 400
        }
    }

    const userId = tokenResult.user_id;
    const result = await Post.create({
        createdBy: userId,
        title: title,
        content: content
    });
    
    if (!result) {
        return {
            success: false,
            message: 'Failed to create post',
            statusCode: 500
        }
    }

    sendUpdatePacket();

    return {
        success: true,
        message: 'Post created successfully',
        postId: result['dataValues'].id
    }
}

const like = async (token, postId) => {
    const tokenResult = await verifyToken(token);
    if (!tokenResult.success) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }

    const userId = tokenResult.user_id;
    const result = await Post.findOne({ where: { id: postId } });
    if (result.length === 0) {
        return {
            success: false,
            message: 'Post not found'
        }
    }

    const post = result;
    if(JSON.parse(post.likedBy).includes(userId)) {
        // remove like 
        const likes = JSON.parse(post.likedBy).filter((id) => id !== userId);
        const result = await Post.update(
            { likedBy: JSON.stringify(likes) },
            { where: { id: postId } }
        )
        if (!result) {
            return {
                success: false,
                message: 'Failed to remove like'
            }
        } else {
            sendUpdatePacket();
            return {
                success: true,
                message: 'Like removed successfully'
            }
        }
    } else {
        // add like
        const likes = JSON.parse(post.likedBy);
        likes.push(userId);
        const result = await Post.update(
            { likedBy: JSON.stringify(likes)},
            { where: { id: postId } }
        )
        if (!result) {
            return {
                success: false,
                message: 'Failed to add like'
            }
        } else {
            sendUpdatePacket();
            return {
                success: true,
                message: 'Like added successfully'
            }
        }
    }
}

module.exports = {
    getAll,
    tweet,
    like
}