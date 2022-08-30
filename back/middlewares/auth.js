const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = (req, res, next) => {
    try {const token = req.headers.authorization.split(" ")[1];
    if(token) {
        const decodedToken = jwt.verify(token, process.env.TOKEN, {complete: true});
        const userId = decodedToken.payload.userId;
        console.log(req.body.userId);
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({message: "non-authentifié."})
    } else {
        res.status(200).json({message: "authentifié."})
    }
    next()}
}
    catch{

    }
}
