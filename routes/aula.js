
exports.lista_questionarios = function(req,res){
    var id_aula = req.params.id_aula;
    req.getConnection(function(err,connection){
        connection.query("SELECT oa_questionario.id_questionario as id,oa_questionario.descricao_OA as nome,oa_questionario.disciplina_id_disciplina as id_disciplina FROM oa_questionario,aula_has_oa_questionario WHERE oa_questionario.id_questionario = aula_has_oa_questionario.OA_questionario_id_questionario and aula_has_oa_questionario.aula_id_aula = ?",[id_aula],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
};
/*
    tipos
    1 = questionario
    2 = galeria
    3 = slide
    4 = video
*/
//lista o conteudo do objeto de aprendizagem recebendo o id e o tipo
exports.select_especifico = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id_objeto = req.params.id_objeto;
    var tipo = req.params.tipo;
    req.getConnection(function(err,connection){ 
        if(connection){
            if (tipo==1){
                connection.query("SELECT q.* FROM questao as q INNER JOIN questionario as qs INNER JOIN questionario_has_questao as q_qs ON qs.id=? and q_qs.id_questionario=qs.id and q.id=q_qs.id_questao;",id_objeto,function(err,rows){
                    if (err) console.log("Error saving : %s",err);
                    res.send(rows);
                });
            }
            else if (tipo==2){
                connection.query("SELECT img.* FROM imagem as img INNER JOIN galeria as g INNER JOIN galeria_has_imagem as g_img ON g.id=? and g_img.id_galeria=g.id and img.id=g_img.id_imagem;",id_objeto,function(err,rows){
                    if (err) console.log("Error saving : %s",err);
                    res.send(rows);
                });
            }
            else if (tipo==3){
                connection.query("SELECT * FROM slide WHERE id=?",id_objeto,function(err,rows){
                    if (err) console.log("Error saving : %s",err);
                    rows[0].tipo = 'apresentacao';
                    res.send(rows);
                });
            }
            else if (tipo==4){
                connection.query("SELECT * FROM video WHERE id=?",id_objeto,function(err,rows){
                    if (err) console.log("Error saving : %s",err);
                    res.send(rows);
                });
            }
        }else{
            console.log('Erro ao conectar ao banco');
            res.send('Erro ao conectar ao banco');
        }
    });

};
var path = require('path');
var base = path.dirname(__dirname).split(path.sep).pop();


//salva os objetos de aprendizagem recebendo suas informações e a aula a q ele faz parte
exports.save_oas = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var tipo =  input.tipo;
    switch(tipo){
        case 'questao':
            let questao = input.objeto;
            let topicos = input.topicos;
        
            questao = JSON.parse(JSON.stringify(questao));
            questao = JSON.parse(questao);
            topicos = JSON.parse(topicos);
            const NDT_ = JSON.parse(input.NDT);
            const id_questionario_ = JSON.parse(input.id_questionario);
            req.getConnection(function(err,connection){ 
                let objeto = {
                    id_questao : 0,
                    descricao_OA : '',
                    disciplina_id_disciplina : questao.disciplina_id_disciplina,
                    professor_id_professor : 1,
                    enunciado : questao.enunciado,
                    desvio_opcaoA : questao.desvio_opcaoA,
                    desvio_opcaoB : questao.desvio_opcaoB,
                    desvio_opcaoC : questao.desvio_opcaoC,
                    desvio_opcaoD : questao.desvio_opcaoD,
                    desvio_opcaoE : questao.desvio_opcaoE,
                    NDQ : questao.NDQ,
                    tempo_esperado: questao.tempo_esperado
                }
                connection.query("SELECT MAX(id_questao) as m FROM oa_questoes",function(err,rows){
                    if(!err){
                        objeto.id_questao = rows[0].m+1;
                        connection.query("INSERT INTO oa_questoes SET ?",objeto,function(err,rows){
                            if(err){
                                console.log("Insert error : %s",err);
                                res.send('Erro!');
                            }
                            else{
                                const id_questao_inserida = objeto.id_questao;
                                let vincular_questao_questionario = {OA_questionario_id_questionario: id_questionario_,
                                OA_questoes_id_questao:id_questao_inserida}
                                connection.query("INSERT INTO oa_questionario_has_oa_questoes SET ?",[vincular_questao_questionario],function(err,rows){
                                    if(err){res.send('Erro'); console.log(err);}
                                });
                                connection.query("SELECT MAX(id_topico) as last_id FROM topico",function(err,rows){
                                    let aux_id = rows[0].last_id;
                                    for(let i = 0; i < topicos.length; i++){
                                        if(topicos[i].id_topico>0){
                                            let aux = {OA_questoes_id_questao: id_questao_inserida,topico_id_topico:topicos[i].id_topico};
                                            connection.query("INSERT INTO oa_questoes_has_topico SET ?",aux,function(err,rows){
                                                if(err){ 
                                                    console.log(err);
                                                    res.send('error');}
                                                if(i==(topicos.length-1)){
                                                        console.log('b');
                                                        res.send('Salvo com sucesso');}    
                                            });
                                        }
                                        else{
                                            aux_id = aux_id + 1;
                                            let id = aux_id;
                                            let topico_ = {
                                                NDT: NDT_,id_topico: id,nome_topico: topicos[i].nome_topico
                                            };
                                            connection.query("INSERT INTO topico SET ?",topico_,function(err,rows){
                                                if(err){
                                                    console.log(err);
                                                    res.send('error');
                                                }
                                                else{
                                                    let vincular_topicos = {OA_questoes_id_questao: id_questao_inserida
                                                        ,topico_id_topico:topico_.id_topico};
                                                    connection.query("INSERT INTO oa_questoes_has_topico SET ?",vincular_topicos,function(err,rows){
                                                        if(err){ 
                                                            console.log(err);
                                                            res.send('error');}
                                                        if(i==(topicos.length-1)){
                                                                console.log('b');
                                                                res.send('Salvo com sucesso');}
                                                    });
                                                }
                                                
                                            })
                                        }
                                    }
                                });
                            }
                        });
                    }else{
                        console.log(err);
                        res.send('Erro');
                    }
                });
                
            });
            break;
        default:
            break;
    }
  
};
