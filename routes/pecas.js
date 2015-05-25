var express = require('express'); 
var router = express.Router();

var Peca = require('../models/peca');
var Categoria = require('../models/categoria');

router.get('/', function(req, res, next) { 
    Peca.find(function(erro, pecas) { 
        res.render('pecas/index', { pecas: pecas , title: 'Lista de Peças'});  
    });
});

router.get('/form', function(req, res) { 
    var peca = {};  
    var categorias = Categoria.find(function(erro, categorias) {
        res.render('pecas/form', {
            peca: peca,
            categorias: categorias,
            title: 'Cadastro'
        });
    });
});

router.get('/form/:id', function(req, res) {
    var id = req.params.id;
    Peca.findOne({_id: id},function(erro, resultado) {
        var categorias = Categoria.find(function(erro, categorias){
            res.render('pecas/form', {peca: resultado, categorias:categorias, title: 'Alteração'});
        });
    });
});

router.post('/save', function(req, res) {
    if(req.body._id){ 
        Peca.findOne({_id: req.body._id}, function(erro, resultado) {
            
            resultado.nome = req.body.nome; 
            resultado.descricao = req.body.descricao;
            resultado.fabricante = req.body.fabricante;
            resultado.valor_unitario = req.body.valor_unitario;
            resultado.categoria = req.body.categoria;
            
            resultado.save(function() {
                res.redirect('/pecas');
            }); 
        }); 
    }
    else
    { 
        var peca = new Peca({ 
            nome:req.body.nome, 
            descricao:req.body.descricao,
            fabricante:req.body.fabricante,
            valor_unitario:req.body.valor_unitario,
            categoria:req.body.categoria
        });
        
        peca.save(function() {
            res.redirect('/pecas');  
        }); 
    } 
});

router.get('/del/:id', function(req, res, next) { 
    var id = req.params.id; 
    Peca.findOne({_id: id},function(erro, resultado) {
        resultado.remove(); 
        res.redirect('/pecas');   
    }); 
});

router.get('/json', function(req, res, next) { Peca.find(function(erro, pecas) { res.json(pecas);  }); });

router.get('/json/:id', function(req, res, next) {
    var id = req.params.id;
    Peca.findOne({_id: id},function(erro, pecas) {
        res.json(pecas);
    });
});

module.exports = router;
