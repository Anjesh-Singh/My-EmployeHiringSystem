const { User } = require('../models/index');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

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
        return jwt.sign(user, 'relevel', {
            expiresIn: '2 days'
        })
    }
    catch(err){
        console.log(err)
    }
} 




module.exports = {
    signup,
    getUserByEmail,
    checkPassword,
    creatToken
}