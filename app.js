var express = require('express');
var app = express();
var server = app.listen(3000);
var connect = require('connect');
var cookieParser = require('cookie-parser');
var path = require('path');
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');

//Use area
app.use(require('connect-logger')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/')));
app.use(cookieParser());
//

//Estable Router Object
var router= express.Router();

//This is index.html area
router.get('/',function  (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});


//This is test for send a post method to myaction
router.get('/form',function  (req,res) {
	res.sendFile(__dirname + '/public/form.html');
});


//This is hadle pose handle request
router.post('/myaction',function  (req,res) {
	res.send('You sent the name "' + req.body.name + '".');
});


//This is about Android Side 
// P.S care about path and upload name
app.post('/upload', function(req, res) {
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
 
// P.S care about path and upload name
 app.get('/uploads/:file', function (req, res){
    file = req.params.file;
    var dirname = "/home/jinniw43805/Node/file-upload";
    var img = fs.readFileSync(dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
 
});

//Total
app.use('/',router);
//


//socket.io
io.on('connection', function(socket){
  console.log('a user connected');
});
//End socket.io
