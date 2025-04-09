const { verifyToken } = require('./authenticationController');
const pool = require('./databaseController');

const getAll = async () => {
    const [result] = await pool.query("SELECT * FROM posts");
    if (result.length === 0) {
        return {
            success: false,
            message: 'No posts found'
        }
    }

    return {
        success: true,
        posts: result
    }
}

const tweet = async (token, title, content) => {
    const tokenResult = await verifyToken(token);
    if (!tokenResult.success) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }

    const userId = token.userId;
    const [result] = await pool.query("INSERT INTO posts (createdBy, title, content) VALUES (?, ?, ?)", [userId, title, content]);
    if (result.affectedRows === 0) {
        return {
            success: false,
            message: 'Failed to create post'
        }
    }

    return {
        success: true,
        message: 'Post created successfully'
    }
}

module.exports = {
    getAll,
    tweet
}