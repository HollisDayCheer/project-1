// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models");
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt");
var nodeMailer = require("nodemailer");
var http = require('http');
var httpServer = http.Server(app);
var ioServer = require('socket.io');
var io = new ioServer(httpServer);




app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
var foundEvents = [];
// var transporter = nodeMailer.createTransport({    
// 	service: 'Gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASSWORD
//     }
// });


io.on('connection', function(socket){
	console.log('user connected with socket id ', socket.id);
	console.log('socket.request.session is ', socket.request.session);
  	socket.on('new event post', function(eventPost){
  		console.log("emit works");
  		console.log(eventPost);
  		io.emit('event post', eventPost)
	});
});
app.get('/', function(req, res) {
	if(req.cookies.userID || req.cookies.hostID){
		db.Event.find({}, function(err, events){	
  			res.render("index", {cookies: req.cookies, events:events});
  		});
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
	//it said that I should use pass instead of password, I do not know why
	console.log(req.body.email);
	console.log(req.body.password)
	db.Host.authenticate(req.body.email, req.body.password, function(err, host){
		if(err){
			db.User.authenticate(req.body.email, req.body.password, function(err, user){
				if(err){
					console.log("no one found with that info");
				}else{
					console.log("no error")
					res.send(user);
				}
			});
		}else{
			console.log("no error")
			res.send(host);
		}
	});
});

app.get("/create", function(req,res){
	res.render("create");
});

//login is jus a step page to turn login info/signup info into a cookie
app.get('/login/user/:userID', function(req,res){
	res.cookie("userID",req.params.userID);
	res.cookie("type", "user");
	res.redirect("/");
});

app.get('/login/host/:hostID', function(req,res){
	res.cookie("hostID",req.params.hostID);
	res.cookie("type", "host");
	res.redirect("/")
});

app.post("/api/users", function(req,res){
	db.User.createSecure(req.body.firstName, req.body.lastName, req.body.nickName, req.body.email, req.body.password, req.body.location, function(err, found){
		console.log(found);
	 // transporter.sendMail({from: user, to: found.email, subject: "Welcome to Frando!", text: "is it me you're looking for?"}, function(err, info){
	 // 	if(err){
	 // 		console.log(err);
	 // 	}else{
	 // 		console.log(info);
	 // 	}
	 // });
	 res.redirect("/login/user/"+found._id);

	});
});

app.post("/api/hosts", function(req,res){
	console.log(req.body);
	db.Host.createSecure(req.body.businessName, req.body.description, req.body.hostEmail, req.body.password, req.body.hostLocation, req.body.phone, function(err, host){
		console.log(host);
	 // transporter.sendMail({from: user, to: host.email, subject: "Welcome to Frando!", locals: {title: "Hello", message: "is it me you're looking for?"}}, function(err, info){
	 // 	if(err){
	 // 		console.log(err);
	 // 	}
		res.redirect("/login/host/"+host._id);
	// });
	})
});


app.post("/api/events", function(req,res){
	console.log(req.body);
	var tagsArray = req.body.eventTags.split(" ");
	db.Event.create({
		name: req.body.eventName,
		description: req.body.eventDescription,
		imageUrl: req.body.imageUrl,
		tags: tagsArray,
		host: req.cookies.hostID,
		users : []
	}, function(err, newEvent){
		res.send(newEvent);
	});
});

app.post("/eventsignup", function(req,res){
	var userID = req.cookies.userID;
	var eventID = req.body.eventID;
	db.Event.findById(eventID, function(err, found){
		if(found.users.indexOf(userID)== -1){
			found.users.push(userID);
			found.save();
			db.User.findById(userID, function(err, user){
				user.events.push(found._id);
				user.save();
				console.log(user.events);
			});
			// 	transorter.sendMail({from: user, to: found.email, subject: "Welcome to Frando!", locals: {title: "Hello", message: "is it me you're looking for?"}}, function(err, info){
			//  		if(err){
			//  		console.log(error);
			//  		}else{
			// 			console.log(found);
			// 		}
			// 	});
			// });
		}
	});
});

app.get("/clearCookies", function(req,res){
	res.cookie("userID", "");
	res.cookie("hostID", "");
	res.cookie("type", "");
	res.redirect("/");
});

app.get("/myevents", function(req,res){
	var foundEvents = [];
	console.log("user id cookie is " + req.cookies.userID);
	db.User.findOne({_id: req.cookies.userID}).populate("events").exec(function(err, found){
		console.log("found user is " +found);
		if(err){
			console.log(err);
		}
		res.render("myevents", {user: found});
	});
		//console.log(foundEvents);
});
httpServer.listen(3000, function () {
  console.log('server started on locahost:3000');
});