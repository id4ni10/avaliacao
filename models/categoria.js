var db = require('../lib/db_connect')();

var Schema = require('mongoose').Schema;

var categoriaSchema = Schema({

    nome: String

});

var Categoria = db.model('Categoria', categoriaSchema);

module.exports = Categoria
