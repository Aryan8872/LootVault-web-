const jwt = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');
const {user} = require('../models/UserModel');

exports.login = async (email, password) => {
    const userData = await user.findOne({ email });

    if (!userData || !(await bcrypt.compare(password, userData.password))) {
        throw new Error('Invalid email or password');
    }
    return jwt.generateToken({ id: userData.email });
};