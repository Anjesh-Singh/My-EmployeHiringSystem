const authService = require('../services/auth.services');

//------------------------------------------------------------------------------------------------------
const serverError = {
    message: "something wents wrong",
    success: false,
    data: {}
}
//------------------------------------------------------------------------------------------------------

const signup = async (req, res) => {
    const response = await authService.signup(req.body)
    if (!response) {
        return res.status(500).json(serverError)
    }
    if(response.error){
        return res.status(400).json({
            message: response.error,
            success: false,
            data: {},
            err: response.details
     })
    }
    return res.status(200).json({
        message: "Successfully signed Up",
        success: true,
        data: response
    })
}
//------------------------------------------------------------------------------------------------------

const signin = async (req, res) => {
    const user = await authService.getUserByEmail(req.body.email);
    if(!user){
        return res.status(404).json({
            message: "No user found by email",
            success: false,
            data: {}
        })
    }
    if(user.error){
        console.log(user.error);
        return res.status(500).json(serverError);

    }
    if(!authService.checkPassword(req.body.password, user.password)){   //If we remove ! from this line it will accept any wrong password to signin
        return res.status(400).json({                                   // because checkpassword is returing value as true/false
            message: "Wrong password",
            success: false,
            data: {}
        })
    }
    const token = authService.creatToken({id: user.id, email: user.email});
    if(!token){
        return res.status(500).json(serverError)
    }
    return res.status(200).json({
        message: "Successfully signed in",
        success: true,
        data: token
    })
}

//------------------------------------------------------------------------------------------------------
module.exports = {
    signup,
    signin
}
