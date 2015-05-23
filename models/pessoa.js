var db = require('../lib/db_connect')(); 

var Schema = require('mongoose').Schema; var pessoaSchema = Schema({ nome: String, email:String }); 

var Pessoa = db.model('Pessoa', pessoaSchema); module.exports = Pessoa