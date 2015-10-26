// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models");
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/frando' // plug in the db name you've been using
);


app.get('/', function(req, res) {
	if(req.cookies.userID){	
  		res.render("index");
  	}
  	else{
  		res.redirect('welcome');
  	}
});

app.get('/signup', function(req,res){
	res.render("signup");
});
app.get('/welcome', function(req,res){
	res.render('welcome');
});

app.post("/login", function(req,res){
	var ourName; 
	db.User.find({email:req.body.email}, function(err, user){
		ourName = user;
	});
})
//login is just a step page to turn login info/signup info into a cookie
app.get('/login/:userID', function(req,res){
	res.cookie("userID",req.params.userID);
	res.render("index");
})
app.post("/api/users", function(req,res){
	db.User.createSecure(req.body.firstName, req.body.lastName, req.body.nickName, req.body.email, req.body.password, req.body.location, function(err, user){
		console.log(user);
	res.redirect("/login/"+user._id);
	});
});

app.get("/clearCookies", function(req,res){
	res.cookie("userID", "");
	res.redirect("index");
})
app.listen(process.env.PORT || 3000, function() {
  console.log("running on port 3k");
});

