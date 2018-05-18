///////////////IMPORT REQUIRE DEPENDANCIES
// import express
// app.get('route',fn)
// app.post('route',fn)
// app.delete('route',fn)
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
// instance of the express app...
var app = express();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/////////////SET UP APP
app.set('view engine', 'ejs');
// app.use('/assets', function(req, res, next){
//   console.log(req.url);
//   // must include next
//   next();
// });
////// EXPRESS STATIC
app.use('/assets', express.static('assets'));

//////////////ROUTES
// respond to requests
app.get('/', function(req, res){
  // res.send('hello..');
  // res.sendFile(__dirname + '/index.html');
  res.render('index');
});

app.get('/contact', function(req, res){
  // res.send('here is the contact page...');
  // res.sendFile(__dirname + '/contact.html');
  // console.log(req.query);
  res.render('contact', { qs: req.query });
});

/// refacted
app.post('/contact', urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('contact-success', { data: req.body });
});

// app.get('/profile/:id', function(req, res){
//   // res.send('you\'ve requested access to profile ' + req.params.id);
//   // render the view...
//   res.render('profile', {id:req.params.id});
// });

// app.get('/profile/:name', function(req, res){
app.get('/profile', function(req, res){
  // res.send('you\'ve requested access to the profile for ' + req.params.name);
  var data = { name: 'Johnny', age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
  // render the view...
  res.render('profile', {person: req.params.name, data: data});
});

// listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
