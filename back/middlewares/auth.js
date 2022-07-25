const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, "TOKEN", async(decodedToken, err) => {
            if(err) {
                res.locals.user = null;
                res.cookie('jwt', '');
                next()
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next()
            };
        });
    } else {
        res.locals.user = null;
        next();
    };
};

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, "TOKEN", async(decodedToken, err) => {
            if(err) {
                res.status(204).json(err);
            } else {
                next();
            }
        });
    } else {
        res.cookie("jwt", "", {maxAge: "1"})
        res.status(401).json({message: "Accès refusé"})
    }
};