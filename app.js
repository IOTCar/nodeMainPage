var express = require('express');
var app = express();
var server = app.listen(3000);
var path = require('path');
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');

//Use area
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));

//

//Estable Router Object
var router= express.Router();


router.get('/',function  (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});


router.get('/form',function  (req,res) {
	res.sendFile(__dirname + '/public/form.html');
});



router.post('/myaction',function  (req,res) {
	res.send('You sent the name "' + req.body.name + '".');
});

//
app.use('/',router);
//


//socket.io
io.on('connection', function(socket){
  console.log('a user connected');
});
//End socket.io
