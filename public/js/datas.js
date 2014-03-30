var socket = io.connect('http://localhost:1234');

var charts = {},
	$cycle = $('#cycle'),
	$time = $('#time'),
	canvas = $('canvas').each(function(){

	charts[ $(this).attr('id') ] = this.getContext('2d');

});

socket.on('new_data', function(data){

	$cycle.text('Données du cycle ' + data.cycle + ' jour ' + data.jour + '.');

	var t = {
		labels: data.label,
		datasets: [
			{
				fillColor : "rgba(231, 76, 60,0.5)",
				strokeColor : "rgba(231, 76, 60,1)",
				data : data.temperature
			}
		]

	}

	var h = {
		labels: data.label,
		datasets: [
			{
				fillColor : "rgba(52, 152, 219,0.5)",
				strokeColor : "rgba(52, 152, 219,1)",
				data : data.humidite
			}
		]

	}

	new Chart(charts.temperature).Line(t)
	new Chart(charts.humidite).Line(h)
})

function doublify(n){

	if(n / 10 < 1){
		return '0' + n ;
	}
	else
	{
		return n ;
	}

}

setInterval(function(){

	var d = new Date();

	$time.text('À ' + doublify(d.getHours()) + ':' + doublify(d.getMinutes()) + ':' + doublify(d.getSeconds()) + ' tout va bien chez les barbus.')

}, 1);