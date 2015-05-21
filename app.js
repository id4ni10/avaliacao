var express = require('express'),
    app = express(),
    cons = require('consolidate'),
	path = require('path'),
    MongoClient = require('mongodb').MongoClient;

	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	app.use(express.static(path.join(__dirname, 'public')));

	app.listen(8080);
    console.log('Express server started on port 8080');

	app.get('/', function(req, res){
            return res.render('hello', { "name" : 'Aquiles' });
	});

	app.get('/pedidos', function(req, res){
        return res.render('produtos');
    });

	app.get('*', function(req, res){
        return res.render('notfound', { "error" : " Página não encontrada!" });
    });
	
	app.post('/pedidos', function(req, res){
		MongoClient.connect('mongodb://localhost:27017/avaliacao', function(err, db) {
			if(err) throw err;

			db.collection('pedidos').insert(
				{ nome:"Aquiles", email:"aquiles@gmail.com", endereco:"rua mizerê" ,
					pecas:[
						{ id:"10923812371", quantidade:2 ,valor_unitário:100.20 },
						{ id:"38327492342", quantidade:3 ,valor_unitário:123.20 } ],
					total:223.40
				});
		db.close();

		return res.render('produtos');
		});
	});

	app.put('/pedidos', function(req, res){

	});

	app.delete('/pedidos', function(req, res){

	});
