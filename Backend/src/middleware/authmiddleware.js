const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklist.model');

async function authUser(req, res, next){
    const authHeader = req.headers.authorization || '';
    const token = req.cookies.token || (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null);
    if(!token){
        return res.status(401).json({message: "No token found"});
    }
     const isBlacklisted = await BlacklistToken.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message: "Token is invalid"});
        } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(401).json({message: "Invalid token"});
    }   
}

module.exports = authUser;
