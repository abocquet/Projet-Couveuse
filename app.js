var express = require('express'),
	nunjucks = require('nunjucks'),
	events = require('./events');

	serial = require('./serial'),
	db = require('./db'),
	sockets = require('./sockets')
;

//On initialise les composants

var app = express();
require('./model')(db());

app.use(express.errorHandler())

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

//On inscrit les routes

app
	.use(express.static('public'))
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