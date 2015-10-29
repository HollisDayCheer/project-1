// CLIENT-SIDE JAVASCRIPT
// On page load
var socket = io();
setTimeout(function(){ console.log(socket.id); }, 500);

$(document).ready(function(){
  $("#user-signup").hide();
  $("#host-signup").hide();
  $(".assessment").hide();
  $(".user-button").on("click", function(e){
    e.preventDefault()
    $(".choice-buttons").hide("slow");
    $("#user-signup").show("slow");
    $(".assessment").show("slow");
  })

$(".host-button").on("click", function(e){
    e.preventDefault()
    $(".choice-buttons").hide("slow");
    $("#host-signup").show("slow");
  })




  console.log('Hey, Earth!');
  $("#login-form").on("submit", function(e){
    e.preventDefault();
    var sendObject = {
      email: $("#login-email").val(),
      password: $("#login-password").val()
    }
    console.log(sendObject);
    $.ajax({
      method: "POST",
      url : "/login",
      data: sendObject
    }).done(function(data){
      console.log(data);
      if(data=="err"){
        $("#login-fail").append("Login Failed");
      }else if(data.type=="user"){
        location.replace("/login/user/"+data._id);
      }else if(data.type=="host"){
        location.replace("/login/host/"+data._id);
      }
    });
  });

  $(".signup-button").on("click", function(req,res){
    console.log($(this).attr("class").split(" ")[0]);
    var sendObject = {
        eventID : $(this).attr("class").split(" ")[0]
    }
    console.log(sendObject);
   $.ajax({
    method: "POST",
    url: "/eventsignup",
    data: sendObject
   }).done(function(data){
      console.log(data);
   });
  });


  socket.on('event post', function(events){
    $(".event-list").prepend( "<li class = 'event-list-item' id = '" + events._id+ "'><h1>" + events.name + "</h1><img src = '" + events.imageUrl + "'><p>" + events.description + "</p><button class = '" + events._id + "' signup-button'>Sign up!</button>");
  });

  $("#event-create-form").on("submit", function(e){
    e.preventDefault();
    var sendObject = {
      eventName: $("#eventName").val(),
      eventDescription: $("#eventDescription").val(),
      imageUrl: $("#imageUrl").val(),
      eventTags: $("#eventTags").val()
    };
    $.ajax({
      url:"/api/events",
      method: "POST",
      data: sendObject
    }).done(function(data){
      socket.emit('new event post', data);
    });
  });

  //$("#signup-form").on("submit", function(e){
   // e.preventDefault();
   // var sendObject = {
   //   firstName : $("#first-name").val(),
  //    lastName : $("#last-name").val(),
  //    nickName : $("#nick-name").val(),
  //    email : $("#email").val(),
  //    location : $("#location").val()
  //  }
  //  $.ajax({
  //    url:"/api/users",
   //   method: "POST",
   //   data: sendObject,
   //   success: function(data){
   //     console.log(data);
    //  }

  	//})
//  })
});