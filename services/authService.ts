const jwt = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');
const {userModel} = require('../models/UserModel');




exports.login = async(email: string, password: string)=> {
    console.log(email)
    console.log(password)

    // Validate user credentials
    const userData = await userModel.findOne({ email });

    if (!userData || !(await bcrypt.compare(password, userData.password))) {
        throw new Error('Invalid email or password');
    }
  
    // Generate JWT tokens
    const accessToken = jwt.generateAccessToken({ id: userData.email });  // JWT generation for access token
    const refreshToken = jwt.generateRefreshToken({ id: userData.email });  // JWT generation for refresh token
  
    // Return user data and tokens
    return {
      user: {
        id: userData.id,
        email: userData.email,
        role: userData.role,  // Make sure role is included
      },
      tokens: {
        accesstoken: accessToken,
        refreshtoken: refreshToken,
      }
    };
  }
