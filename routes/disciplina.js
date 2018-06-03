//disciplina -> aulas
exports.lista_aulas = function(req,res){
    var idatu = req.params.id;
    req.getConnection(function(err,connection){
        connection.query("SELECT a.id, a.descricao_aula FROM tbaula as a where a.id_disciplina=?",idatu,(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });

    });
};