var mongoose = require('mongoose'), single_connection; 
module.exports = function() {    
    var url = 'mongodb://localhost/trabalho';  
    
    if(!single_connection) {    
        single_connection = mongoose.connect(url);
    }  
    
    return single_connection; };