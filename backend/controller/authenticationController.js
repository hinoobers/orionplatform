const bcrypt = require('bcrypt');
const User = require("../models/UserModel");

const authentications = [];

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User not found'
            };
        }

        const match = await bcrypt.compare(password, user.hashed_password);
        if (!match) {
            return {
                success: false,
                statusCode: 401,
                message: 'Invalid password'
            };
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
        };

    } catch (error) {
        return {
            success: false,
            message: 'Error during login',
            error: error.message
        };
    }
};

const register = async (username, email, password) => {
    if (!username || !email || !password) {
        return {
            success: false,
            statusCode: 400,
            message: 'Missing required fields'
        };
    }

    try {
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            return {
                success: false,
                statusCode: 409,
                message: 'Email already exists'
            };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username,
            email,
            hashed_password: hashedPassword
        });

        return {
            success: true,
            user_id: user.id
        };

    } catch (error) {
        return {
            success: false,
            message: 'Error during registration',
            error: error.message
        };
    }
};

const verifyToken = (token) => {
    const authentication = authentications.find(auth => auth.token === token);
    if (!authentication) {
        return {
            success: false,
            message: 'Invalid token'
        };
    }

    return {
        success: true,
        user_id: authentication.user_id
    };
};

module.exports = {
    login,
    register,
    verifyToken
};
