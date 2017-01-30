var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
  content: String
})


var beerSchema = new Schema ({
  name: String,
  style: String,
  bars: [{type: Schema.Types.ObjectId, ref:"Bar"}],
  comments: [commentSchema]
});


module.exports = mongoose.model("Beer", beerSchema);



