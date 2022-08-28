const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN, {complete: true});
        const userId = decodedToken.userId;
        req.auth = { userId: userId, role: res.role };
        //console.log(req.auth);
        next();
    } catch (error) {
        res.status(401).json({error})
        //console.log(req.headers.authorization);
        console.log(error);
    };
}