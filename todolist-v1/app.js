//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var date = "";
  // if(currentDay === 6 || currentDay === 0){
  //   res.send("Yay it's the weekend!");
  // } else {
  //   //write multiple lines of code in one clump by either using "res.write" or "res.sendFile";
  //   // res.write("Broski");
  //   // res.write("Boo! I have to work!");
  //   // res.send();
  //   //OR
  //   res.sendFile(__dirname + "/index.html");
  // }

  //Using EJS now
  // if(currentDay === 6 || currentDay === 0){
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }

  //Using EJS for efficiently
  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error: current day is equal to: " + day);
  }

  //kindOfDay is the variable from the list.ejs file and we are simply passing over the day variable to the html file and manipulate it. EJS is used to
  //not create multiple html files just for small changes in the html.
  res.render("list", {kindOfDay: day});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
