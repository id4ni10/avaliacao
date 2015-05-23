var express = require('express'); 
var router = express.Router();

var Peca = require('../models/peca');

router.get('/', function(req, res, next) { 
    Peca.find(function(erro, pecas) { 
        res.render('pecas/index', { pecas: pecas , title: 'Lista de Peças'});  
    });
});

router.get('/form', function(req, res) { 
    var peca = {};  
    res.render('pecas/form', {
        peca: peca,
        title: 'Cadastro'
    }); 
});

router.get('/form/:id', function(req, res) {
    var id = req.params.id;
    Peca.findOne({_id: id},function(erro, resultado) {
        res.render('pecas/form', {peca: resultado, title: 'Alteração'});
    });
});

router.post('/save', function(req, res) {
    if(req.body._id){ 
        Peca.findOne({_id: req.body._id}, function(erro, resultado) {
            
            resultado.nome = req.body.nome; 
            resultado.descricao = req.body.descricao;
            resultado.fabricante = req.body.fabricante;
            resultado.valor_unitario = req.body.valor_unitario;
            
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
            valor_unitario:req.body.valor_unitario
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

module.exports = router;
