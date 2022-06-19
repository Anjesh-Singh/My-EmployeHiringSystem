const validateAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "invalid arguments",
            success: false,
            body: {}
        });
    }
    next();
}


module.exports = {
    validateAuth
}