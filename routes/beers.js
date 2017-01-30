var express = require('express');
var router = express.Router();
var beersCtrl = require('../controllers/beers_ctrl');

// Index
router.get('/', beersCtrl.index);
// New
router.get('/new', beersCtrl.newBeer)
// Show
router.get('/:id', beersCtrl.show);
// Create
router.post('/', beersCtrl.createBeer);
// edit
router.get('/:id/edit', beersCtrl.edit);
// Update
router.put('/:id', beersCtrl.updateBeer);
// // Destroy
router.delete('/:id', beersCtrl.deleteBeer);

router.post('/:id/bars', beersCtrl.addBar);


module.exports = router;
