const { verifyToken } = require('./authenticationController');
const pool = require('./databaseController');
const { sendUpdatePacket } = require('./socketController');

const getAll = async () => {
    let [result] = await pool.query("SELECT * FROM posts");
    if (result.length === 0) {
        return {
            success: false,
            message: 'No posts found'
        }
    }

    for(let i = 0; i < result.length; i++) {
        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [result[i].createdBy]);
        result[i].username = user[0].username;
    }

    return {
        success: true,
        total: result.length,
        posts: result
    }
}

const tweet = async (token, title, content) => {
    const tokenResult = await verifyToken(token);
    console.log(tokenResult, token);
    if (!tokenResult.success) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }

    const userId = tokenResult.user_id;
    const [result] = await pool.query("INSERT INTO posts (createdBy, title, content) VALUES (?, ?, ?)", [userId, title, content]);
    if (result.affectedRows === 0) {
        return {
            success: false,
            message: 'Failed to create post'
        }
    }

    sendUpdatePacket();

    return {
        success: true,
        message: 'Post created successfully'
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
    const [result] = await pool.query("SELECT * FROM posts WHERE id = ?", [postId]);
    if (result.length === 0) {
        return {
            success: false,
            message: 'Post not found'
        }
    }

    const post = result[0];
    if(JSON.parse(post.likedBy).includes(userId)) {
        // remove like 
        const likes = JSON.parse(post.likedBy).filter((id) => id !== userId);
        const [result] = await pool.query("UPDATE posts SET likedBy = ? WHERE id = ?", [JSON.stringify(likes), postId]);
        if (result.affectedRows === 0) {
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
        const [result] = await pool.query("UPDATE posts SET likedBy = ? WHERE id = ?", [JSON.stringify(likes), postId]);
        if (result.affectedRows === 0) {
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