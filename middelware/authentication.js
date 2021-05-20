const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authentication = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "examprojecttoken");
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({error: "You are not logged in - Please authenticate"})
    }
}

module.exports = authentication;