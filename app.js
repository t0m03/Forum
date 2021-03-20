var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

// EJS設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  let array = getData();
  res.render('index', {message_list: array});
});

app.post('/', function (req, res) {
  let array = getData();

  if (req.body.message.length > 0) {
    array.push(req.body.message);
    fs.writeFileSync("data.txt", array.join("\r\n"));
  }

  res.render('index', {message_list: array});
})

function getData() {
  let data = fs.readFileSync("data.txt", {encoding: "utf-8"});
  var array = [];
  if(data.length > 0) {
    array = data.split(/\r\n|\r|\n/);
  }
  return array;
}

app.listen(3000, function () {

});