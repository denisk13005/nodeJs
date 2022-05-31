const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];//on récupère le token dans le header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//on décode le token avec la même clef de crypatage que pour le token d'authentification (on a défini cette clef dans le fichier controllers/user.js)
    const userId = decodedToken.userId;//on récupère l'id de l'utilisateur dans le token
    req.auth = {userId} //on ajoute l'id de l'utilisateur dans la requête pour pouvoir l'utiliser dans les autres middlewares
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