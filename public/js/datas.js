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
				strokeColor: "rgba(231, 76, 60, 1)",
				fillColor: "rgba(231, 76, 60,0.1)",
				data : data.temperature
			}
		],

	}

	var h = {
		labels: data.label,
		datasets: [
			{
				strokeColor: "rgba(52, 152, 219,1)",
				fillColor: "rgba(52, 152, 219,0.1)",
				data : data.humidite
			}
		]

	}

	var options = {
		scaleOverride : true,
		scaleSteps : 10,
		scaleStepWidth : 10,
		scaleStartValue : 0
	}

	new Chart(charts.temperature).Line(t, options);
	new Chart(charts.humidite).Line(h, options);
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