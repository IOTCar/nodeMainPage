var express = require('express');
var app = express();
var server = app.listen(3000);
var path = require('path');
var io = require('socket.io').listen(server);
var fs = require('fs');

var bodyParser = require('body-parser');

//Use area
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));
//app.use(connect.cookieParser());
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

router.post('/upload', function(req, res) {
  console.log(req.files.image.originalFilename);
  console.log(req.files.image.path);
    fs.readFile(req.files.image.path, function (err, data){
    var dirname = "/home/jinniw43805/Node/file-upload";
    var newPath = dirname + "/uploads/" +   req.files.image.originalFilename;
    fs.writeFile(newPath, data, function (err) {
    if(err){
    res.json({'response':"Error"});
    }else {
    res.json({'response':"Saved"});     
}
});
});
});


app.get('/uploads/:file', function (req, res){
    file = req.params.file;
    var dirname = "/home/jinniw43805/Node/file-upload";
    var img = fs.readFileSync(dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
 
});

//
app.use('/',router);
//


//socket.io
io.on('connection', function(socket){
  console.log('a user connected');
});
//End socket.io
