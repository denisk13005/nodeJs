//ce fichier servira de controlleur pour l'authentification
const User = require('../models/User'); //on importe le modèle de données User
const bcrypt = require('bcrypt');// on importe bcrypt pour crypter le mot de passe
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
//on hash le mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      //on crée un nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash
      });
      //on sauvegarde l'utilisateur
      user.save()
      
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  //on cherche l'utilisateur qui correspond à l'email entré
  User.findOne({ email: req.body.email })
    .then(user => {
      //si l'utilisateur n'existe pas
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //si l'utilisateur existe, on vérifie le mot de passe avec la méthode compare
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          //si le mot de passe est invalide
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //si le mot de passe est valide, on envoie un token et l'id de l'user
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, //on signe le token avec l'id de l'utilisateur pour ne pas qu'un autre utilisateur puisse modifier un produit (seul celui avec l'id peut modifier ses produits)
              'RANDOM_TOKEN_SECRET',//on définit un sel pour le token
              { expiresIn: '24h' }//on définit une durée de validité du token
            )
          });
        })
        
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};