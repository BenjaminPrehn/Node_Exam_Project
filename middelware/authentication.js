const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');

const login = fs.readFileSync(__dirname + "/../public/login.html", "utf-8");

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies["auth_token"]
        const decoded = jwt.verify(token, "examprojecttoken");
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.redirect("/login");
    }
}

module.exports = authentication;