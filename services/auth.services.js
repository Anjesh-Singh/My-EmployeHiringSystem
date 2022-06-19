const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//------------------------------------------------------------------------------------------------------

const signup = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    }
    catch (err) {
        console.log(err.errors)
        if (err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError') {
            return {
                error: err.message,
                details: err.errors[0].message
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------
const getUserByEmail = async (userEmail) => {
    try{
        const user = await User.findOne({           //when findOne will find user in database it will return all data about that email
            where:{                                 //And if not find any value then it will return null
                email: userEmail
            }
        });
        return user;
    }
    catch(err){
        console.log(err)
        return {
            error : err.message
        }
    }
    
}
//------------------------------------------------------------------------------------------------------
const checkPassword = (userPass, encryptPass) => {
    return bcrypt.compareSync(userPass, encryptPass);   //checkPassword will return value in true/false
    
}
//------------------------------------------------------------------------------------------------------

const creatToken = (user) => {
    try{
        return jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '2 days'
        })
    }
    catch(err){
        console.log(err)
    }
} 
//------------------------------------------------------------------------------------------------------

const verifyToken = async (token) => {
    try{
        const response = jwt.verify(token, process.env.JWT_SECRET);
        return response;
    }
    catch(err){
        console.log(err);

    }
}

//------------------------------------------------------------------------------------------------------
const getUserById = async (id) => {
    try{
        const user = await User.findByPK(id);
        return user;
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    signup,
    getUserByEmail,
    checkPassword,
    creatToken,
    verifyToken,
    getUserById
}