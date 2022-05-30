const express = require('express');
const mongoose = require('mongoose');//import de mongoose qui va facilité la connaction avec la base de donnée
//on importe le modèle de données
const Thing = require('./models/thing');
// const Product = require('./models/thing'); // pour quiz partie 2

const app = express();
  //connection a la base de donnée en mettant le chemin de la base de donnée perso crée sur mongo db 
mongoose.connect('mongodb+srv://denisk13005:Lucas*2808@cluster0.0zytcsg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
//middleware pour fixer l'erreur cors multiOrigine
app.use((req, res, next) => {
  //accéder à l'api depuis nimporte quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //ajouter les headers pour les requêtes
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //envoie des requêtes get, post, put, delete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

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

// middleware de gestion des routes API POST
app.post('/api/stuff', (req, res, next) => {
  //on supprime le faux id envoyer per le front-end
  delete req.body._id;
  //on crée une nouvelle instance de la classe Thing contenant les données de l'objet a envoyer
  const thing = new Thing({
    ...req.body
  });
  //enregistre ds la bdd les données de l'objet
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


//on crée une route pour récupérer un objet en fonction de son id
app.get('/api/stuff/:id', (req, res, next) => {
  //la methode findOne permet de récupérer un objet de la bdd en fonction de son id
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
// on crée une route pour modifier un objet en fonction de son id
app.put('/api/stuff/:id', (req, res, next) => {
  //méthode updteOne qui permet de modifier un objet de la bdd en fonction de son id
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
// on crée une route pour modifier un objet en fonction de son id
app.delete('/api/stuff/:id', (req, res, next) => {
  //méthode updteOne qui permet de modifier un objet de la bdd en fonction de son id
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});



//route pour récupérer tout les objets thing
app.get('/api/stuff', (req, res, next) => {
  //la methode find permet de récupérer tout les objets de la bdd
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});




module.exports = app;