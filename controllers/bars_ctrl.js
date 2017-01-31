var Bar = require('../models/bar');
var Beer = require('../models/beer');

module.exports = {
  index: index,
  show: show,
  newBar: newBar,
  createBar: createBar,
  edit: edit,
  updateBar: updateBar,
  deleteBar: deleteBar,
  addBeer: addBeer,
  removeBeer: removeBeer
}

function index(req, res) {
  Bar.find({}, function(err, bars) {
    res.render('bars/index', {bars: bars});
  });
}

function show(req, res) {
  Bar.findById(req.params.id).populate('beers').exec(function(err, bar) {
    Beer.find({}).exec(function(err, beers) {
      res.render('bars/show', {bar: bar, beers: beers})
    })
  })
}

function newBar(req, res) {
  res.render('bars/new', {bar: {}});
}

function createBar(req, res) {
  var bar = new Bar(req.body);
  bar.save(function(err) {
    // one way to handle errors
    if (err) return res.render('bars/new');
    console.log(bar);
    // for now, redirect right back to new.ejs
    res.redirect('/bars');
  });
}

function addBeer(req, res) {
  Bar.findById(req.params.id, function(err, bar) {
    bar.beers.push(req.body.beerId);
    bar.save(function(err) {
      Beer.findById(req.body.beerId, function(err, beer) {
        beer.bars.push(req.params.id);
        beer.save(function(err) {
          res.redirect('/bars/' + bar._id);
        });
      });
    });
  });
}


function edit(req, res, next) {
  Bar.findById(req.params.id, function(err, bar) {
    if (err) return next(err);
    res.render('bars/edit', {bar: bar});
  });
}

function updateBar(req, res) {
  Bar.findByIdAndUpdate(req.params.id, req.body, function(err, bar) {
    if (err) return res.render('bars/' + req.params.id + '/edit');
    res.redirect('/bars');
  });
}

function deleteBar(req, res) {
  console.log('Hi from delete method');
  Bar.findByIdAndRemove(req.params.id, function(err) {
    res.redirect('/bars');
  });
}

function removeBeer(req, res, next) {
 Bar.findById(req.params.id, function(err, bar) {
   bar.beers.remove(req.body.beerId);
   bar.save(function(err) {
     Beer.findById(req.body.beerId, function(err, beer) {
       beer.bars.remove(req.params.id);
       beer.save(function(err) {
         res.redirect('/bars/' + bar._id);
       });
     });
   });
 });
}





