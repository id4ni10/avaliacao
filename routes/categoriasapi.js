var express = require('express');
var router = express.Router();

var Categoria = require('../models/categoria');

router.get('/', function(req, res, next) {
    Categoria.find(function(erro, categorias) {
        //res.render('categorias/index', { categorias: categorias , title: 'Lista de Peças'});
        res.json(categorias);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Categoria.findOne({_id: id},function(erro, resultado) {
        res.json(resultado);
    });
});

router.post('/', function(req, res) {

        var categoria = new Categoria({
            nome:req.body.nome
        });

        categoria.save(function() {
            res.json(categoria);
        });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;

    Categoria.findOne({_id: id}, function(erro, resultado) {
        resultado.nome = req.body.nome;

        resultado.save(function() {
            res.json(resultado);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Categoria.findOne({_id: id},function(erro, resultado) {
        resultado.remove();
        res.json(resultado);
    });
});

module.exports = router;
