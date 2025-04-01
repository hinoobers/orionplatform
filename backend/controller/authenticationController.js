const authentications = [];
const pool = require('./databaseController');
const bcrypt = require('bcrypt');

const login = async (email, password) => {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) {
        return {
            success: false,
            message: 'User not found'
        }
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.hashed_password);
    console.log(password, user.hashed_password, match);
    if (!match) {
        return {
            success: false,
            message: 'Invalid password'
        }
    }

    const token = Math.random().toString(36).substring(2);
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

const register = (email, password) => {

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