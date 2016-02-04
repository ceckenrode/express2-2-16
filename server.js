var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var middleware = require('./middleware')

var app = express();
var PORT = 3000;


app.use(session({
  secret: 'crazy secret boom!!',
  cookie: {
    maxAge: 5000
  },
  saveUninitialized: true,
  resave: false
}));

app.use(bodyparser.urlencoded({
  extended: false
}));


app.get('/login', function(req, res) {
  res.sendFile(process.cwd() + "/views/login.html");
});

app.post('/login', function(req, res) {
  console.log(req.body);
  if (req.body.email === "a@a.com" && req.body.password === "a") {
    req.session.authenticated = true;
    var loggedInTime = parseInt(req.body.times);
    if (loggedInTime > 0) {
      req.session.cookie.maxAge = loggedInTime * 1000;
    }
    res.redirect('/account');
  } else {
    req.session.cookie.authenticated = false;
    res.redirect("/help");
  }

});

app.get('/account', middleware.isAuthenticated, function(req, res) {
  res.sendFile(process.cwd() + "/views/account.html");
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + "/views/home.html");

});

app.get('/help', function(req, res) {
  res.sendFile(process.cwd() + "/views/help.html");

});

app.listen(PORT, function() {
  console.log("listening on port: " + PORT);
});
