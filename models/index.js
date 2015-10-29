var mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/YOUR_LOCAL_DATABASE_NAME' // plug in the db name you've been using
);

module.exports.User = require("./user.js");
module.exports.Host = require("./host.js");
module.exports.Event = require("./event.js");
// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");
