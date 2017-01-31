var express = require('express');
var router = express.Router();
var barsCtrl = require('../controllers/bars_ctrl');

// Index
router.get('/', barsCtrl.index);
// New
router.get('/new', barsCtrl.newBar)
// Show
router.get('/:id', barsCtrl.show);
// Create
router.post('/', barsCtrl.createBar);
// edit
router.get('/:id/edit', barsCtrl.edit);
// Update
router.put('/:id', barsCtrl.updateBar);
// // Destroy
router.delete('/:id', barsCtrl.deleteBar);

router.post('/:id/beers', barsCtrl.addBeer);

router.delete('/:id/beers/delete', barsCtrl.removeBeer);


module.exports = router;
