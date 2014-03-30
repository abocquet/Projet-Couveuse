var serialPort = require("serialport"),
	SerialPort = serialPort.SerialPort,
	events = require('./events')
;

var nb_clients = 0,
	refresh
;

var getDatas = function(data){

	data = data.split[':'][1].split('-');
	var datas = {

		jour: data[0],
		cycle: data[1],
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

var port = new SerialPort('/dev/cu.usbmodem411', {
	parser: serialPort.parsers.readline("\n")
});
	port.on("data", getDatas);

events.client.on('connection', function(){ nb_clients++; changeRefreshFreq(); });
events.client.on('deconnection', function(){ nb_clients--; changeRefreshFreq(); });

var changeRefreshFreq = function(){

	var freq ;

	if(nb_clients > 0)
	{
		freq = 1000 * 10 ;
	}
	else
	{
		freq = 1000 * 60 * 10 ;
	}

	clearInterval(refresh);
	refresh = setInterval(function(){

		port.write('GD:C-J-T-H\n');

	}, freq);
};