const authentications = [];
const pool = require('./databaseController');
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) {
        return {
            success: false,
            statusCode: 404,
            message: 'User not found'
        }
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.hashed_password);
    if (!match) {
        return {
            success: false,
            statusCode: 401,
            message: 'Invalid password'
        }
    }

    const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    authentications.push({
        token,
        user_id: user.id
    });

    return {
        success: true,
        token,
        user_id: user.id
    }
}

const register = async (username, email, password) => {
    if(!username || !email || !password) {
        return {
            success: false,
            statusCode: 400,
            message: 'Missing required fields'
        }
    }

    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return {
            success: false,
            statusCode: 409,
            message: 'Email already exists'
        }
    }


    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const values = [username, email, hashedPassword];
    const [result] = await pool.query('INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)', values, function (err, result) {
        if (err) { throw err }
    });

    if(result.affectedRows == 0) {
        return {
            success: false,
            message: 'Failed to register user'
        }
    }

    return {
        success: true
    }
}

const verifyToken = (token) => {
    const authentication = authentications.find(auth => auth.token === token);
    if (!authentication) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }

    return {
        success: true,
        user_id: authentication.user_id
    }
}

module.exports = {
    login,
    register,
    verifyToken
}