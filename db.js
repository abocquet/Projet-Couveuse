module.exports = function(){

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  database : 'ppe',
	  user     : 'root',
	  password : 'root'
	});

	connection.connect();
		
	return connection ;
};