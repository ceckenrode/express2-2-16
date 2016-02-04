var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 3000;
var isLoggedIn = false;

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + "/views/login.html");
});

app.listen(PORT, function() {
  console.log("App listening on port %s", PORT);
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + "/views/home.html");
});

app.get('/account', function(req, res) {
  if (isLoggedIn){
  res.sendFile(process.cwd() + "/views/account.html");
};
});

app.get('/help', function(req, res) {
  res.sendFile(process.cwd() + "/views/help.html");
});

app.post("/login", function(req, res) {
  console.log(req.body);
  if (req.body.email === "a@a.com" && req.body.password === "a") {
    isLoggedIn = true;
    res.redirect('/account');
  } else{
    res.redirect('/help');
  }


  
});
