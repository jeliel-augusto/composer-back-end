/*Nesse arquivo, tudo relacionado à questionários e questões*/
exports.criar_questionario = function(req,res){
    let request_ = JSON.parse(JSON.stringify(req.body));
    const id_aula = request_.id_aula;
    const assunto = request_.assunto;
    req.getConnection(function(err,connection){
        connection
        .query("SELECT id_disciplina FROM aula WHERE id_aula = ?",[id_aula],(err,rows)=>{
            if(err){
                console.log("Select error : %s",err);
                res.send(err);
            }
            else{
                let id_disciplina = rows[0].id_disciplina;
                connection.query("SELECT MAX(id_questionario) as last_id FROM oa_questionario",(err,rows2)=>{ 
                    if(err){
                        console.log("Select error: %s",err);
                        res.send(err);
                    }
                    else{
                        const _id = rows2[0].last_id + 1;
                        const questionario ={
                            id_questionario: _id,
                            flag_avaliacao: 1,
                            disciplina_id_disciplina: id_disciplina,
                            descricao_OA: assunto
                        }
                        connection.query("INSERT INTO oa_questionario SET ?",questionario,(err,rows)=>{
                            if(err){
                                console.log("Insert error: %s",err);
                                res.send(err);
                            }else{
                                let vincular = {aula_id_aula: id_aula,OA_questionario_id_questionario:_id};
                                connection.query("INSERT INTO aula_has_oa_questionario SET ?",vincular,(err,rows)=>{
                                    if(!err){
                                        res.send('Salvo com sucesso!');
                                    }else{
                                        console.log(err);
                                        res.send(err);
                                    }
                                });
                            }
                        });
                    }
                });    
            }
        }); 
    });
}
exports.listar_questoes_all = function(req,res){
    var id_questionario = req.params.id_questionario;
    req.getConnection(function(err,connection){
        connection
        .query("SELECT DISTINCT oa_questoes.id_questao as id, oa_questoes.enunciado, oa_questoes.NDQ FROM oa_questoes,oa_questionario,oa_questionario_has_oa_questoes WHERE oa_questionario_has_oa_questoes.OA_questionario_id_questionario = ? AND oa_questionario_has_oa_questoes.OA_questoes_id_questao = oa_questoes.id_questao ",[id_questionario],(err,rows)=>{
            console.log(rows);
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
}
exports.listar_questoes_pesquisa_descricao = function(req,res){
    var id_disciplina = req.params.id_disciplina;
    var pesquisa = "%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection
        .query("SELECT id_questao,descricao_OA FROM oa_questoes WHERE descricao_OA LIKE ? AND id_disciplina = ?",[pesquisa,id_disciplina],(err,rows)=>{
            console.log(rows);
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
}
exports.listar_questoes_pesquisa_topicos = function(req,res){
    var id_disciplina = req.params.id_disciplina;
    var pesquisa = "%"+req.params.pesquisa+"%";
    req.getConnection(function(err,connection){
        connection
        .query("SELECT id_questao,descricao_OA FROM oa_questoes,topico WHERE oa_questoes.id_topico = topico.id_topico AND oa_questoes.disciplina_id_disciplina = ? AND topico.nome_topico LIKE ?",[pesquisa,id_disciplina],(err,rows)=>{
            console.log(rows);
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
}
exports.detalhe_questao= function(req,res){
    var id_questao = req.params.id_questao;
    req.getConnection(function(err,connection){
        connection
        .query("SELECT oa_questoes.* FROM oa_questoes where id_questao = ?",[id_questao],(err,rows)=>{
            let responseObject = {q: null, topicos: null};
            if(err) console.log("Select error : %s",err);
            else{
                responseObject.q = rows;
                connection.query("SELECT topico.nome_topico FROM topico,oa_questoes_has_topico WHERE oa_questoes_has_topico.OA_questoes_id_questao = ? AND topico.id_topico = oa_questoes_has_topico.topico_id_topico",id_questao,function(err,rows2){
                    responseObject.topicos = rows2;
                    res.send(responseObject);
                });
            }            
        });
    });
}
//Não concluído
exports.gerarVersao = function(req,res){
    var id_questionario = req.params.id_questionario;
    var ordemIdsV1 = [], ordemIdsV2 = [];
    req.getConnection(function(err,connection){
        connection.query("SELECT id_questao FROM oa_questoes,oa_questionario_has_oa_questoes WHERE oa_questionario_has_oa_questoes.OA_questionario_id_questionario = ? AND oa_questionario_has_oa_questoes.OA_questoes_id_questao = oa_questoes.id_questao",[id_questao],(err,rows)=>{
            console.log(rows);
            if(err) console.log("Select error : %s",err);
            res.send(rows);
            
        });
    });
}
exports.criar_questao = function(req,res){
    var descricao_OA = req.params.descricao_oa;
    var disciplina_id_disciplina = req.params.id_disciplina;
    var professor_id_professor = 1;
    var enunciado = req.params.enunciado;
    var tempo_esperado = req.params.tempo_esperado;
    var desvio_opcaoA = req.params.desvio_opcaoA;
    var desvio_opcaoB = req.params.desvio_opcaoB;
    var desvio_opcaoC = req.params.desvio_opcaoC;
    var desvio_opcaoD = req.params.desvio_opcaoD;
    var desvio_opcaoE = req.params.desvio_opcaoE;
    var NDQ = req.params.NDQ;
    var questao = {
        descricao_OA: descricao_OA,
        disciplina_id_disciplina: disciplina_id_disciplina,
        professor_id_professor: professor_id_professor,
        enunciado: enunciado,
        desvio_opcaoA: desvio_opcaoA,
        desvio_opcaoB: desvio_opcaoB,
        desvio_opcaoC: desvio_opcaoC,
        desvio_opcaoD: desvio_opcaoD,
        desvio_opcaoE: desvio_opcaoE
    }
    req.getConnection(function(err,connection){
        connection
        .query("INSERT INTO oa_questoes SET ?",questao,(err,rows)=>{
            if(err){
                console.log("Insert error : %s",err);
            }
            else{res.send("salvo");}
        }).then(function(){
            console.log('Promise');
        });
    });   
}