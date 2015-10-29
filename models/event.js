var mongoose = require("mongoose");
var bcrypt = require("bcrypt")
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	name: String,
	description: String,
	imageUrl: String,
	host: String,
	tags: [String]
});
EventSchema.statics.pairRandos = function(){
	//pair every rando with someone of a similar personality type
}

var Event = mongoose.model("Event", EventSchema);
module.exports = Event;
