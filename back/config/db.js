const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://" + process.env.USER_MONGODB +"@cluster0.qzfen.mongodb.net/NewProject",
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connecté !"))
.catch(() => console.log(("Connexion à MongoDB échouée. ")));