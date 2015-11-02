var mongoose = require("mongoose");
var bcrypt = require("bcrypt")
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	nickName: String,
	email: String,
	passwordDigest: String, //I haven't done the bcrypt stuff yet whoops
	location: String,
	events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
	type: String
	 //reference, array of ID's
});

UserSchema.statics.createSecure = function(firstName, lastName, nickName, email, password, location, callback){
	var UserModel = this;
	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(password, salt, function(err, hash){
			UserModel.create({
				firstName: firstName,
				lastName: lastName,
				nickName: nickName,
				email: email,
				passwordDigest: hash,
				location: location,
				events: [],
				type: "user",
			}, callback);
		});
	});
};

UserSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, foundUser) {
   // throw error if can't find user
   console.log(password);
   if (!foundUser) {
     console.log('No user with email ' + email);
     callback("Error: no user found", null);  
   // if we found a user, check if password is correct
   } else if (foundUser.checkPassword(password)) {
   	// return no error and the found user
     callback(null, foundUser);
   } else {
   	//otherwise send back that the incorrect password was returned. 
     callback("Error: incorrect password", null);
   }
 });
};
UserSchema.methods.checkPassword = function(password){
	  return bcrypt.compareSync(password, this.passwordDigest);
}

var User = mongoose.model('User', UserSchema);


module.exports = User;

