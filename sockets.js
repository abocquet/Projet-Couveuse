var events = require('./events');

module.exports = function(io){

	io.sockets.on('connection', function (socket) {

		events.client.emit('connection');

		events.data.emit('get', function(data){
			socket.emit('new_data', data);
		});

		socket.on('disconnect', function(){
			events.client.emit('deconnection');
		})

		events.data.on('disp', function(){
			events.data.emit('get', function(data){
				socket.emit('new_data', data);
			});
		})

	})

}