const mongoose = require('mongoose');

//on crée un schéma de données pour la bdd
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);

//********************modèle pour quiz partie 2 ******************************************

// const Product = mongoose.Schema({
//   name : { type: String, required: true },
//   description : { type: String, required: true },
//   price: { type: Number, required: true },
//   inStock : { type: Boolean, required: true },
// })

// module.exports = mongoose.model('Product', Product);
//**********************fin modèle quiz partie 2 *****************************************