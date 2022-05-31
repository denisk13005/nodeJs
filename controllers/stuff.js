const Thing = require('../models/thing');

// on exporte la logique métier qui servira à créer un objet de type Thing vers le routeur
exports.createThing = (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
// get pour un thing en particulier avec son id
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id // id du thing à récupérer
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// put pour un thing en particulier avec son id
exports.modifyThing = (req, res, next) => {
  const thing = new Thing({ // on crée un nouvel objet de type Thing pour modifier le thing existant
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then( // on modifie le thing existant
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
// delete pour un thing en particulier avec son id
exports.deleteThing = (req, res, next) => { 
  Thing.findOne({ _id: req.params.id }).then( // on récupère le thing à supprimer avec son id
    (thing) => {
      if (!thing) { // si le thing n'existe pas
        res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (thing.userId !== req.auth.userId) { // si l'utilisateur n'est pas le propriétaire du thing
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      Thing.deleteOne({ _id: req.params.id }).then( // on supprime le thing 
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};
 // get pour tous les things
exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};