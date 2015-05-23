var express = require('express');
var router = express.Router();

var Categoria = require('../models/categoria');

router.get('/', function(req, res, next) {
    Categoria.find(function(erro, categorias) {
        res.render('categorias/index', { categorias: categorias , title: 'Lista de Peças'});
    });
});

router.get('/form', function(req, res) {
    var categoria = {};
    res.render('categorias/form', {
        categoria: categoria,
        title: 'Cadastro'
    });
});

router.get('/form/:id', function(req, res) {
    var id = req.params.id;
    Categoria.findOne({_id: id},function(erro, resultado) {
        res.render('categorias/form', {categoria: resultado, title: 'Alteração'});
    });
});

router.post('/save', function(req, res) {
    if(req.body._id){
        Categoria.findOne({_id: req.body._id}, function(erro, resultado) {

            resultado.nome = req.body.nome;

            resultado.save(function() {
                res.redirect('/categorias');
            });
        });
    }
    else
    {
        var categoria = new Categoria({
            nome:req.body.nome
        });

        categoria.save(function() {
            res.redirect('/categorias');
        });
    }
});

router.get('/del/:id', function(req, res, next) {
    var id = req.params.id;
    Categoria.findOne({_id: id},function(erro, resultado) {
        resultado.remove();
        res.redirect('/categorias');
    });
});

router.get('/json', function(req, res, next) { Categoria.find(function(erro, categorias) { res.json(categorias);  }); });

module.exports = router;
