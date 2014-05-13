var express = require('express'),
	events = require('./events');

	serial = require('./serial'),
	db = require('./db'),
	sockets = require('./sockets')
;

//On initialise les composants

var app = express();
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/view/index.html');
});

require('./model')(db());


//On inscrit les routes

app
	.use(express.static(__dirname + '/public'))
	.use(express.bodyParser())

	.get('/', function(req, res){ res.render('index.html'); })
;

//On prépare socket.io
var server = require('http').createServer(app),
	io = require('socket.io').listen(server)
;

io.set('log level', 1);
sockets(io);

//On lance la purée
server.listen(1234);
