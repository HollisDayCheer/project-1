var mongoose = require("mongoose");
var bcrypt = require("bcrypt")
var Schema = mongoose.Schema;

var HostSchema = new Schema({
	businessName: String,
	description: String,
	email: String,
	passwordDigest: String, //I haven't done the bcrypt stuff yet whoops
	location: String,
	phone: String,
	type: String,
});

HostSchema.statics.createSecure = function(businessName, description, email, password, location, phone, callback){
	var HostModel = this;
	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(password, salt, function(err, hash){
			HostModel.create({
				businessName: businessName,
				description: description,
				email: email,
				passwordDigest: hash,
				location: location,
				phone: phone,
				type: "host"
			}, callback);
		});
	});
};

HostSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, foundHost) {
 	console.log(foundHost);
   // throw error if can't find user
   if (!foundHost) {
     console.log('No user with email ' + email);
     callback("Error: no user found", null);  
   // if we found a user, check if password is correct
   } else if (foundHost.checkPassword(password)) {
   	// return no error and the found user
     callback(null, foundHost);
   } else {
   	//otherwise send back that the incorrect password was returned. 
     callback("Error: incorrect password", null);
   }
 });
};

HostSchema.methods.checkPassword = function(password){
	console.log("in checkPassword");
	console.log(password);
	console.log(this);
	console.log(this.passwordDigest);
	return bcrypt.compareSync(password, this.passwordDigest);
}

var Host = mongoose.model('Host', HostSchema);


module.exports = Host;

