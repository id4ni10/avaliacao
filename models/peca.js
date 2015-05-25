var db = require('../lib/db_connect')(); 

var Schema = require('mongoose').Schema; var pecaSchema = Schema({ 
    
    nome: String, 
    descricao: String,
    fabricante: String,
    valor_unitario: Number,
    categoria: Schema.Types.ObjectId

}); 

var Peca = db.model('Peca', pecaSchema); 

module.exports = Peca
