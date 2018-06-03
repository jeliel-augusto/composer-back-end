// salva uma imagem e a adciona uma galeria
exports.save_imagem = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id_atu = req.params.id;
    req.getConnection(function(err,connection){ 
      
            data2={
                url:input.url,
                legenda:input.legenda,
                referencia:input.referencia
            }
            connection.query("INSERT INTO imagem set ?",data2,function(err,rows){
                if (err) console.log("Error saving : %s",err);
            });
            var elinkado=input.elinkado;
            if(elinkado){
                var id_galeria=input.id_galeria;
                connection.query("SELECT LAST_INSERT_ID() as id;",(err,rows)=>{
                    if(err) console.log("Select error : %s",err);
                    if(rows[0].id==0) return;
                    data3={
                        id_galeria:id_galeria,
                        id_imagem:rows[0].id
                    }
                    connection.query("INSERT INTO galeria_has_imagem set ?",data3,function(err,rows){
                        if (err) console.log("Error saving : %s",err);
                    });
                });
            }
            res.send("salvo");
    });
};