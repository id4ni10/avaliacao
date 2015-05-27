var db = require('../lib/db_connect')();

var Schema = require('mongoose').Schema;

var pedidoSchema = Schema({

    nome: String,
    email: String,
    endereco: String,
    pecas: [ {} ],
    total: Number

});

var Pedido = db.model('Pedido', pedidoSchema);

module.exports = Pedido
