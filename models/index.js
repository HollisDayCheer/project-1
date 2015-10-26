var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/frando");

module.exports.User = require("./user.js");
// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");
