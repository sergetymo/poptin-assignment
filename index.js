var fs = require('fs');
var express = require('express');
var path = require('path');
var bp = require('body-parser');

var app = express();
app.use(bp.json());

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
    ;

    fs.writeFile('./config.js', result, 'utf8', function (error) {
       if (error) return console.log(error);
    });
  });
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/editor.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/editor.js'));
});
app.get('/config.js', function(request, response) {
  response.sendFile(path.join(__dirname + '/config.js'));
});

app.listen(process.env.PORT);
console.log('listeting');
