const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); //on importe le middleware d'authentification

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth,stuffCtrl.getAllStuff);//on ajoute le middleware d'authentification a chaque route pour la proteger
router.post('/',auth, stuffCtrl.createThing);
router.get('/:id',auth, stuffCtrl.getOneThing);
router.put('/:id',auth, stuffCtrl.modifyThing);
router.delete('/:id',auth, stuffCtrl.deleteThing);

module.exports = router;