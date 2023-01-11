const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =  require("https");
const app = express();

// We use this in order to make sure that the static files we use are being used in the live server, in this case we put all our static files into public to make sure they organized.
app.use(express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log("Server is running on port 3000");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/992134dd09";

  const options = {
    method: "POST",
    auth: "frank1:463d6cd58474f8a08e1d6f33d957891c-us5"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


//463d6cd58474f8a08e1d6f33d957891c-us5
// 992134dd09
