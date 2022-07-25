const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { removeListener } = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message:'Utilisateur créé avec succès' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(err => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then((user) => {
        if(!user) {
            return res.status(401).json({message: "Identifiants incorrects"})
        } else {
            bcrypt.compare( req.body.password, user.password)
            .then((valid) => {
                if(!valid) {
                    return res.status(401).json({ message: "Identifiants incorrects" })
                } else {
                    const token = jwt.sign({userId: user._id}, "TOKEN", {expiresIn: "24h"})
                    res.cookie("jwt", token);
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                        role: user.role
                    })
                }
            })
            .catch(error => {console.log(error); res.status(500).json({ error })})
        }
    })
    .catch(error => res.status(500).json({ error }))
};

exports.logout = (req, res, next) => {
    res.cookie("jwt", "")
    res.status(200).json("OUT")
}