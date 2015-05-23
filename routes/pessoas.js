var express = require('express'); var router = express.Router();
var Pessoa = require('../models/pessoa');

router.get('/', function(req, res, next) { 
    Pessoa.find(function(erro, pessoas) { 
        res.render('pessoas/index', { pessoas: pessoas , title: 'Lista de Pessoas'});  
    });
});

router.get('/form', function(req, res) { 
    var pessoa = {};  
    res.render('pecas/form', {
        pessoa: pessoa,
        title: ‘Cadastro'
    }); 
});

router.get('/form/:id', function(req, res) { 
    var id = req.params.id;  
    Pessoa.findOne({_id: id},function(erro, resultado) {
        res.render('pessoas/form', {pessoa: resultado, title: 'Alteração'});  
    }); 
});

router.post('/save', function(req, res) {
    if(req.body._id){ 
        Pessoa.findOne({_id: req.body._id},function(erro, resultado) {
            resultado.nome = req.body.nome; 
            resultado.email = req.body.email;
            resultado.save(function() {
                res.redirect('/pessoas');
            }); 
        }); 
    }
    else
    { 
        var pessoa = new Pessoa({nome: req.body.nome, email: req.body.email});
        pessoa.save(function() {
            res.redirect('/pessoas');  
        }); 
    } 
});


router.get('/del/:id', function(req, res, next) { 
    var id = req.params.id; 
    Pessoa.findOne({_id: id},function(erro, resultado) {
        resultado.remove(); 
        res.redirect('/pessoas');   
    }); 
});

router.get('/json', function(req, res, next) { Pessoa.find(function(erro, pessoas) { res.json(pessoas);  }); });

module.exports = router;