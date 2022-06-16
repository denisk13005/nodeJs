const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');//import de mongoose qui va facilité la connaction avec la base de donnée
//on importe le modèle de données
const stuffRoutes = require('./routes/stuff'); //on importe le router pour les produits
const userRoutes = require('./routes/user'); //on importe le router pour l'authentification


const app = express();
  //connection a la base de donnée en mettant le chemin de la base de donnée perso crée sur mongo db 
mongoose.connect(`mongodb+srv://denisk13005:${process.env.MONGO_PASSWORD}@cluster0.0zytcsg.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//middleware pour fixer l'erreur cors multiOrigine
app.use((req, res, next) => {
  //accéder à l'api depuis nimporte quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajouter les headers pour les requêtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization','Accept-Language','Content-Canguage','Range');
  //envoie des requêtes get, post, put, delete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes); //on ajoute le router pour les produits
app.use('/api/auth', userRoutes); //on ajoute le router pour l'authentification
// ******************************quiz partie 2***********************************************
// app.post('/api/products', (req, res, next) => {
//   const product = new Product({
//   ...req.body
//   });
//   product.save()
//   .then(() => res.status(201).json({product}))
//   .catch(error => res.status(400).json({error}));
// });


// app.get('/api/products/:id', (req, res, next) => {
//   Product.findOne({_id: req.params.id})
//     .then(product => {
//       res.status(201).json(         
//          {product : product}
//       );
//     })
//     .catch(error => {
//       res.status(400).json({
//         error
//       });
//     });
// });
// app.put('/api/products/:id', (req, res, next) => {
//   Product.updateOne({_id: req.params.id},{_id: req.params.id, ...req.body})
//     .then(product => {
//       res.status(201).json({         
//         message:'Modified!'
//       });
//     })
//     .catch(error => {
//       res.status(400).json({
//         error
//       });
//     });
// });
// app.delete('/api/products/:id', (req, res, next) => {
//   Product.deleteOne({_id: req.params.id})
//     .then(product => {
//       res.status(201).json({
//         message: 'Deleted!'
//       });
//     })
//     .catch(error => {
//       res.status(400).json({
//         error
//       });
//     });
// });



// app.get('/api/products', (req, res, next) => {
//   Product.find()
//     .then(products => {
//       res.status(201).json({
//         products : products
//       });
//     })
//     .catch(error => {
//       res.status(400).json({
//         error
//       });
//     });
// });
// *********************************fin quiz partie 2 ******************************************





module.exports = app;