var serialPort = require("serialport"),
	SerialPort = serialPort.SerialPort,
	events = require('./events')
;

var getDatas = function(data){

	data = data.split('-');
	var datas = {
		cycle: data[0],
		jour: data[1],
		temperature: data[2],
		humidite: data[3]
	}

	mongoose.model('state').create(datas, function(err, state){
		if (err) throw err ;

		events.data.emit('new', state, function(){
			events.data.emit('disp')
		});
	})

}

var port = new SerialPort('/dev/ttyAMA0', {
	parser: serialPort.parsers.readline("\n")
});
	port.on("data", getDatas);

