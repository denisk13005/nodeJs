const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];//on récupère le token dans le header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//on vérifie le token avec le sel
    const userId = decodedToken.userId;//on récupère l'id de l'utilisateur dans le token
    if (req.body.userId && req.body.userId !== userId) { //si l'id de l'utilisateur dans le token et celui dans le body ne sont pas identiques
      throw 'Invalid user ID'; //on lance une erreur
    } else {
      next();//sinon on passe au middleware suivant
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};