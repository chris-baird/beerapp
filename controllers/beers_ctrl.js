var Beer = require('../models/beer');
var Bar = require('../models/bar');

module.exports = {
  index: index,
  show: show,
  newBeer: newBeer,
  createBeer: createBeer,
  edit: edit,
  updateBeer: updateBeer,
  deleteBeer: deleteBeer,
  addBar: addBar
}

function index(req, res) {
  Beer.find({}, function(err, beers) {
    res.render('beers/index', {beers: beers});
  });
}

function show(req, res) {
  Beer.findById(req.params.id, function(err, beer) {
    res.render('beers/show', {beer: beer})
  })
}

function newBeer(req, res) {
  res.render('beers/new', {beer: {}});
}

function createBeer(req, res) {
  var beer = new Beer(req.body);
  beer.save(function(err) {
    // one way to handle errors
    if (err) return res.render('beers/new');
    console.log(beer);
    // for now, redirect right back to new.ejs
    res.redirect('/beers');
  });
}

function addBar(req, res) {
  Beer.findById(req.params.id, function(err, beer) {
    beer.bars.push(req.body.barId);
    beer.save(function(err) {
      bar.findById(req.body.barId, function(err, bar) {
        bar.beers.push(req.params.id);
        bar.save(function(err) {
          res.redirect('/beers/' + beer._id);
        });
      });
    });
  });
}


function edit(req, res, next) {
  Beer.findById(req.params.id, function(err, beer) {
    if (err) return next(err);
    res.render('beers/edit', {beer: beer});
  });
}

function updateBeer(req, res) {
  Beer.findByIdAndUpdate(req.params.id, req.body, function(err, beer) {
    if (err) return res.render('beers/' + req.params.id + '/edit');
    res.redirect('/beers');
  });
}

function deleteBeer(req, res) {
  console.log('Hi from delete method');
  Beer.findByIdAndRemove(req.params.id, function(err) {
    res.redirect('/beers');
  });
}





