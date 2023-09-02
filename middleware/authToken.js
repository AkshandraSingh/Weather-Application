const jwt = require('jsonwebtoken')

const tokenLogger = require('../utils/tokenLogger/tokenLogger')

const userAuthentication = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        let token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                tokenLogger.log('error', "User authentication failed!")
                res.status(401).json({
                    success: false,
                    message: "User authentication failed!"
                });
            } else {
                tokenLogger.log('info', "User authentication pass!")
                req.user = decoded.userData;
                next();
            }
        })
    } else {
        tokenLogger.log('error', "Token not found!")
        res.status(401).json({
            success: false,
            message: "Token not found!"
        })
    }
}


module.exports = {
    userAuthentication
}
