var express = require('express');
var router = express.Router();

var Pedido = require('../models/pedido');

router.get('/', function(req, res, next) {
    Pedido.find(function(erro, pedidos) {
        res.json(pedidos);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Pedido.findOne({_id: id},function(erro, resultado) {
        res.json(resultado);
    });
});

router.post('/', function(req, res) {

    Pedido.findOne({_id: req.body._id}, function(erro, resultado) {

        resultado.nome = req.body.nome;
        resultado.descricao = req.body.descricao;
        resultado.fabricante = req.body.fabricante;
        resultado.valor_unitario = req.body.valor_unitario;

        resultado.save(function() {
            res.json(resultado);
        });
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Pedido.findOne({_id: id},function(erro, resultado) {
        resultado.remove();
        res.json(resultado);
    });
});

module.exports = router;
