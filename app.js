var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    crypto = require('crypto'),
    MongoClient = require('mongodb').MongoClient;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/avaliacao', function(err, db) {
    if(err) throw err;

	app.get('/', function(req, res){
            return res.render('hello', { "name" : 'Aquiles' });
	});
    
    app.get('/pedidos', function(req, res){
	
        return res.render('produtos', { "error" : " Página não encontrada!" });
    });

    app.listen(8080);
    console.log('Express server started on port 8080');
	
});
