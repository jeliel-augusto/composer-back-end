exports.liga_questao_questionario = function(req,res){
    var id_questao = req.params.id_questao;
    var id_questionario = req.params.id_questionario;
    req.getConnection(function(err,connection){
        var ligacao={
            OA_questionario_id_questionario:id_questionario,
            OA_questoes_id_questao:id_questao
        }
        connection.query("INSERT INTO oa_questionario_has_oa_questoes set ?",ligacao,function(err,rows){
            if (err) console.log("Error saving : %s",err);
        });
    });
    res.send("ligou");
};
// exports.liga_imagem_galeria = function(req,res){
//     var id_imagem = req.params.id_imagem;
//     var id_galeria = req.params.id_galeria;
//     req.getConnection(function(err,connection){
//         data3={
//             id_imagem:id_imagem,
//             id_galeria:id_galeria
//         }
//         connection.query("INSERT INTO galeria_has_imagem set ?",data3,function(err,rows){
//             if (err) console.log("Error saving : %s",err);
//         });
//     });
//     res.send("ligou");
// };
// exports.liga_questionario_aula = function(req,res){
//     var id_questionario = req.params.id_questionario;
//     var id_aula = req.params.id_aula;
//     req.getConnection(function(err,connection){
//         data3={
//             id_questionario:id_questionario,
//             id_aula:id_aula
//         }
//         connection.query("INSERT INTO aula_has_questionario set ?",data3,function(err,rows){
//             if (err) console.log("Error saving : %s",err);
//         });
//     });
//     res.send("ligou");
// };

// exports.liga_galeria_aula = function(req,res){
//     var id_galeria = req.params.id_galeria;
//     var id_aula = req.params.id_aula;
//     req.getConnection(function(err,connection){
//         data3={
//             id_galeria:id_galeria,
//             id_aula:id_aula
//         }
//         connection.query("INSERT INTO aula_has_galeria set ?",data3,function(err,rows){
//             if (err) console.log("Error saving : %s",err);
//         });
//     });
//     res.send("ligou");
// };

// exports.liga_slide_aula = function(req,res){
//     var id_slide = req.params.id_slide;
//     var id_aula = req.params.id_aula;
//     req.getConnection(function(err,connection){
//         data3={
//             id_slide:id_slide,
//             id_aula:id_aula
//         }
//         connection.query("INSERT INTO aula_has_slide set ?",data3,function(err,rows){
//             if (err) console.log("Error saving : %s",err);
//         });
//     });
//     res.send("ligou");
// };

// exports.liga_video_aula = function(req,res){
//     var id_video = req.params.id_video;
//     var id_aula = req.params.id_aula;
//     req.getConnection(function(err,connection){
//         data3={
//             id_video:id_video,
//             id_aula:id_aula
//         }
//         connection.query("INSERT INTO aula_has_video set ?",data3,function(err,rows){
//             if (err) console.log("Error saving : %s",err);
//         });
//     });
//     res.send("ligou");
// };