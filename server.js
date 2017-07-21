var fs = require('fs');
var express = require('express');
var path = require('path');
var bp = require('body-parser');

// Initialize server and JSON request body parser
var app = express();
app.use(bp.json());

// On POST, read config template file, replace placeholders with values
// that came from request and write actual config file to filesystem.
app.post('/', function(request, response) {
  response.send(request.body);

  fs.readFile('./config-tpl.js', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }
    var result = data
      .replace(/%header-top%/g, request.body.header.top)
      .replace(/%header-left%/g, request.body.header.left)
      .replace(/%input-top%/g, request.body.input.top)
      .replace(/%input-left%/g, request.body.input.left)
      .replace(/%submit-top%/g, request.body.submit.top)
      .replace(/%submit-left%/g, request.body.submit.left)
      .replace(/%footer-top%/g, request.body.footer.top)
      .replace(/%footer-left%/g, request.body.footer.left)
      .replace(/%color%/g, request.body.color)
    ;

    fs.writeFile('./config.js', result, 'utf8', function (error) {
      if (error) return console.log(error);
      console.log('** Updated /config.js **');
    });
  });
});

// Serve needful static files
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
  console.log('Served /index.html');
});
app.get('/editor.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/editor.js'));
  console.log('Served /editor.js');
});
app.get('/config.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/config.js'));
  console.log('Served /config.js');
});
app.get('/poptup.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/poptup.js'));
  console.log('Served /poptup.js');
});
app.get('/jscolor.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/jscolor.js'));
  console.log('Served /jscolor.js');
});
app.get('/test.html', function(request, response) {
  response.sendFile(path.join(__dirname + '/test.html'));
  console.log('Served /test.html');
});

// app.listen(process.env.PORT);
app.listen(3000);
console.log('Listening...')
