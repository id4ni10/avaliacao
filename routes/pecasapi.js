var express = require('express');
var router = express.Router();

var Peca = require('../models/peca');

router.get('/', function(req, res, next) {
    Peca.find(function(erro, pecas) {
        res.json(pecas);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Peca.findOne({_id: id},function(erro, resultado) {
        res.json(resultado);
    });
});

router.post('/', function(req, res) {

    var peca = new Peca({
        nome:req.body.nome,
        descricao:req.body.descricao,
        fabricante:req.body.fabricante,
        valor_unitario:req.body.valor_unitario,
        categoria:req.body.categoria
    });

    peca.save(function() {
        res.json(peca);
    });
});

router.put('/:id', function(req, res) {

    Peca.findOne({_id: req.body._id}, function(erro, resultado) {

        resultado.nome = req.body.nome;
        resultado.descricao = req.body.descricao;
        resultado.fabricante = req.body.fabricante;
        resultado.valor_unitario = req.body.valor_unitario;
        resultado.categoria = req.body.categoria;

        resultado.save(function() {
            res.json(resultado);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Peca.findOne({_id: id},function(erro, resultado) {
        resultado.remove();
    });
});

module.exports = router;
