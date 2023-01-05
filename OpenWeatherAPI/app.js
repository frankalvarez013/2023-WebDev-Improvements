const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
/*HTTPS is native so no need to get from external (npm)*/
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
// Necesary code to parse through the work

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const key = "f068da4814aabd2f84bfabf82d3ca7c7";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ key +"&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      console.log(data);
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const weatherDescription = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send()
    });
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
