//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const date = require(__dirname + "/date.js");
//You can still manipulate the inside of the array as a const
//You just can't assign the array into another array.
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extendend:true}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  ///////////////////////////////////////////
  // let today = new Date();
  // let currentDay = today.getDay();
  // let date = "";
  //////////////////////////////////////////
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
  //////////////////////////////////////////
  //Using EJS for efficiently
  // let options = {weekday:"long",day:"numeric",month:"long"};
  // let day = today.toLocaleDateString("en-US", options);
  /////////////////////////////////////////
  //We get this function from the date.js module which holds a date function, you have to use the parenthesis to get the result.
  let day = date.getDate();

  //kindOfDay is the variable from the list.ejs file and we are simply passing over the day variable to the html file and manipulate it. EJS is used to
  //not create multiple html files just for small changes in the html.
  res.render("list2", {listTitle: day, newListItems: items});
});

app.post("/", function(req,res){
  //In order to access this item we need app.use(bodyParser)... to be able to get the vale we need from that text input.
  let item = req.body.newItem;
  console.log(req.body.list);
  if (req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  //redirect to the app.get("/") because the home res.render needs the item value
});

app.get("/work", function(req,res){
  res.render("list2", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
