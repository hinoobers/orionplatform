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

module.exports = {
    getAll
}