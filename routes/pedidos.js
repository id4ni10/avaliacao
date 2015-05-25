var express = require('express');
var router = express.Router();

var Pedido = require('../models/pedido');

router.get('/', function(req, res, next) {
    Pedido.find(function(erro, pedidos) {
        res.render('pedidos/index', { pedidos: pedidos , title: 'Lista de Pedidos'});
    });
});

router.get('/form', function(req, res) {
    var pedido = {};
    res.render('pedidos/form', {
        pedido: pedido,
        title: 'Cadastro'
    });
});

router.get('/form/:id', function(req, res) {
    var id = req.params.id;
    Pedido.findOne({_id: id},function(erro, resultado) {
        res.render('pedidos/form', {pedido: resultado, title: 'Alteração'});
    });
});

router.post('/save', function(req, res) {
    if(req.body._id){
        Pedido.findOne({_id: req.body._id}, function(erro, resultado) {

            resultado.nome = req.body.nome;
            resultado.descricao = req.body.descricao;
            resultado.fabricante = req.body.fabricante;
            resultado.valor_unitario = req.body.valor_unitario;

            resultado.save(function() {
                res.redirect('/pedidos');
            });
        });
    }
    else
    {
        var pedido = new Pedido({
            nome:req.body.nome,
            descricao:req.body.descricao,
            fabricante:req.body.fabricante,
            valor_unitario:req.body.valor_unitario
        });

        pedido.save(function() {
            res.redirect('/pedidos');
        });
    }
});

router.get('/del/:id', function(req, res, next) {
    var id = req.params.id;
    Pedido.findOne({_id: id},function(erro, resultado) {
        resultado.remove();
        res.redirect('/pedidos');
    });
});

router.get('/json', function(req, res, next) { Pedido.find(function(erro, pedidos) { res.json(pedidos);  }); });

module.exports = router;
