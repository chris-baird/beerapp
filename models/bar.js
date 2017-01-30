var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var barSchema = new Schema ({
  name: String,
  location: String,
  beers: [{type:Schema.Types.ObjectId, ref: "Beer"}]
})

module.exports = mongoose.model("Bar", barSchema);
