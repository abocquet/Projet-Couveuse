var events = require('./events');

module.exports = function(connection){

	events.data.on('new', function(data, cb){

		var query = 'INSERT INTO data(jour, cycle, temperature, humidite) VALUES(' + data.jour + ', ' + data.cycle + ', ' + data.temperature + ', ' + data.humidite + ')' ;
		connection.query(query, function(){
			if(err) throw err ;

			cb();
		})
	});

	events.data.on('get', function(cb){

		connection.query('SELECT * FROM data'
			, function(err, rows, fields){
				if(err) throw err ;

				var last = rows[ rows.length - 1];

				datas = {
					label: [],
					temperature: [],
					humidite: [],
					cycle: last.cycle,
					jour: last.jour,
				};

				for (var i = 0, c = rows.length ; i < c; i++) {
					datas['label'].push(rows[i].date.getHours() + ':' + rows[i].date.getMinutes());
					datas['temperature'].push(rows[i].temperature);
					datas['humidite'].push(rows[i].humidite);
				};

				cb(datas);
			}
		);

	})

}