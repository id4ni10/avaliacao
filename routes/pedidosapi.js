var express = require('express');
var router = express.Router();

var Pedido = require('../models/pedido');

router.get('/', function (req, res, next) {
    Pedido.find(function (erro, pedidos) {
        res.json(pedidos);
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Pedido.findOne({
        _id: id
    }, function (erro, resultado) {
        res.json(resultado);
    });
});

router.post('/', function (req, res) {

    var fpecas = [];
    var count = req.body.qtd_itens;

    for (var i = 0; i < count; i++) {
        var peca = {
            _id: req.body['pecas[' + i + '][_id]'],
            quantidade: req.body['pecas[' + i + '][quantidade]'],
            valor_unitario: req.body['pecas[' + i + '][valor_unitario]']
        };

        fpecas.push(peca);
    }

    var pedido = new Pedido({
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.endereco,
        pecas: fpecas,
        total: req.body.total
    });

    pedido.save(function () {
        res.json(pedido);
    });
});

router.put('/:id', function (req, res) {

    Pedido.findOne({
        _id: req.body._id
    }, function (erro, resultado) {

        resultado.nome = req.body.nome;
        resultado.descricao = req.body.email;
        resultado.endereco = req.body.endereco;
        resultado.pecas = req.body.pecas;
        resultado.total = req.body.total;

        resultado.save(function () {
            res.json(resultado);
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Pedido.findOne({
        _id: id
    }, function (erro, resultado) {
        resultado.remove();
        res.json(resultado);
    });
});

module.exports = router;
