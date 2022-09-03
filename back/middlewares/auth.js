const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.TOKEN, {
        complete: true,
      });
      const userId = decodedToken.payload.userId;
      User.findById(userId).then((currentUser) => {

        if (!currentUser.id) {
          res.status(401).json({ message: "non-authentifié." });
        } else {
          res.status(200)
        }
        next();
      });
    }
  } catch {
    res.status(401).json({message: "Erreur"})
  }
};
