const { User } = require('../models/index');

const signup = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    }
    catch (err) {
        console.log(err.errors)
        if(err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError'){
            return{
                error: err.message,
                details: err.errors[0].message
            }
        }
    }
}


module.exports = {
    signup
}