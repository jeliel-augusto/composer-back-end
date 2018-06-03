exports.questionario = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,nome from questionario where nome like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};
exports.topicos = function(req,res){
    var pesquisa = "%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT * FROM  topico WHERE nome_topico LIKE ?",[pesquisa],function(err,rows){
            if(err) res.send([]);
            res.send(rows);
        });
    });
}
exports.galeria = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,nome from galeria where nome like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};

exports.slide = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,nome from slide where nome like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};

exports.video = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,nome from video where nome like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};

exports.imagem = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,legenda from imagem where legenda like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};

exports.questao = function(req,res){
    var pesquisa ="%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection.query("SELECT id,enunciado from questao where enunciado like ?;",pesquisa,function(err,rows){
            if (err) console.log("Error saving : %s",err);
            res.send(rows);
        });
    });
};