//Listagem de todas as disciplinas
exports.lista_disciplinas_all = function(req,res){
    // var idatu = req.params.id_professor;
    req.getConnection(function(err,connection){
        connection.query("SELECT id_disciplina, nome_disciplina FROM disciplina",(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
};
exports.criar_aula = function(req,res){
    var data = {
        id_aula: 0,
        id_disciplina: req.body.id_disciplina,
        descricao_aula: req.body.descricao_aula};
    req.getConnection(function(err,connection){
        connection.query("SELECT MAX(id_aula) as LAST_ID FROM aula",(err,rows)=>{
            data.id_aula = (rows[0].LAST_ID+1);
            connection.query("INSERT INTO aula SET ?",[data],(err,rows)=>{
                if(err) console.log("Insert error : %s",err);
                else{res.send('Salvo');}
            });
        });
    });
}
//Listagem de todas as aulas de uma disciplina
exports.lista_aulas = function(req,res){
    var idDisciplina = req.params.id_disciplina;
    req.getConnection(function(err,connection){
        connection.query("SELECT id_aula as id, descricao_aula FROM aula WHERE id_disciplina = ?",[idDisciplina],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
}
//Listagem OAS de uma aula(Só questionários por enquanto)
exports.lista_OAS = function(req,res){
    var idAula = req.params.id_aula;
    req.getConnection(function(err,connection){
        connection
        .query("SELECT id_questionario,descricao_OA FROM oa_questionario WHERE id_disciplina = ?",[idDisciplina],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
}

// // lista as disciplinas de um professor
// exports.lista_disciplinas = function(req,res){
//     var idatu = req.params.id_professor;
//     req.getConnection(function(err,connection){
//         connection.query("SELECT d.id, d.nome FROM disciplina as d inner join professor_has_disciplina as pd on pd.id_professor=? and d.id=pd.id_disciplina;",idatu,(err,rows)=>{
//             if(err) console.log("Select error : %s",err);
//             res.send(rows);
//         });
//     });
// };

// // lista as aulas de um professor
// exports.lista_aulas = function(req,res){
//     var id_professor = req.params.id_professor;
//     req.getConnection(function(err,connection){
//         connection.query("select aula.descricao_aula, aula.id from aula where aula.id_professor=?;",idprofessor,(err,rows)=>{
//             if(err) console.log("Select error : %s",err);
//             res.send(rows);
//         });
//     });
// };

// //aulas de determinada disciplina do professor
// exports.lista_aulas = function(req,res){
//     var id_professor = req.params.id_professor;
//     var id_disciplina = req.params.id_disciplina;
//     req.getConnection(function(err,connection){
//         connection.query("select aula.id, aula.descricao_aula from aula where aula.id_disciplina=? and aula.id_professor=?;",[id_disciplina,id_professor],(err,rows)=>{
//             if(err) console.log("Select error : %s",err);
//             res.send(rows);
//         });

//     });
// };