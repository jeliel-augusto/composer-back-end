exports.lista_todas_disciplinas = function(req,res){
    var id_curso = req.params.id_curso;
    var id_coordenador = req.params.id_coordenador;
    //Todas as disciplinas de um curso de um coordenador
    req.getConnection(function(err,connection){
        connection
        .query("SELECT DISTINCT disciplina.id_disciplina,disciplina.nome_disciplina FROM coordenador,turma,curso, turma_has_disciplina, disciplina WHERE coordenador.id_coordenador = ? AND turma.id_curso = curso.id_curso AND curso.id_curso = coordenador.curso_id_curso AND turma.id_turma = turma_has_disciplina.turma_id_turma AND disciplina.id_disciplina = turma_has_disciplina.disciplina_id_disciplina ",[id_coordenador],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            console.log(rows);
            res.send(rows);
        });
    });
};
exports.lista_turmas_disciplina = function(req,res){
    var id_curso = req.params.id_curso;
    var id_disciplina = req.params.id_disciplina;
    var id_coordenador = req.params.id_coordenador;
    //Todas as turmas da disciplina do curso do coordenador
    req.getConnection(function(err,connection){
        connection
        .query("SELECT turma.id_turma,turma.turno FROM coordenador, turma, disciplina,turma_has_disciplina WHERE turma.id_curso = coordenador.curso_id_curso AND coordenador.id_coordenador = ? AND turma_has_disciplina.disciplina_id_disciplina = disciplina.id_disciplina AND turma.id_turma = turma_has_disciplina.turma_id_turma AND disciplina.id_disciplina = ?",[id_coordenador,id_disciplina],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
};
exports.lista_aulas_disciplina_turma = function(req,res){
    var id_disciplina = req.params.id_disciplina;
    var id_turma = req.params.id_turma;
    //Todas as aulas da turma
    req.getConnection(function(err,connection){
        connection
        .query("SELECT aula.id_aula, aula.descricao_aula FROM aula_has_turma, aula WHERE aula.id_aula = aula_has_turma.aula_id_aula AND aula_has_turma.turma_id_turma = ? AND aula.id_disciplina = ?",[id_turma,id_disciplina],(err,rows)=>{
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
};
exports.lista_questionarios_aula = function(req,res){
    var id_aula = req.params.id_aula;
    //Todos os questionarios da turma e da disciplina
    req.getConnection(function(err,connection){
        connection
        .query("SELECT oa_questionario.id_questionario, oa_questionario.descricao_OA FROM oa_questionario, aula_has_oa_questionario WHERE aula_has_oa_questionario.aula_id_aula = ? AND aula_has_oa_questionario.OA_questionario_id_questionario = oa_questionario.id_questionario",[id_aula],(err,rows)=>{
            console.log(rows);
            if(err) console.log("Select error : %s",err);
            res.send(rows);
        });
    });
};
exports.ligar_simulado_turma = function(req,res){
    var id_turma = req.params.id_turma;
    var id_simulado = req.params.id_simulado;
    data={
        id_turma: id_turma,
        id_simulado: id_simulado
    };
    //Todos os questionarios da turma e da disciplina
    req.getConnection(function(err,connection){
        connection
        .query("INSERT INTO turma_has_simulado SET ?",data,(err,rows)=>{
            if(err) console.log("Error saving: %s",err);
            res.send(rows);
        });
    });
};
exports.criar_simulado = function(req,res){
    var id_coordenador = req.params.id_coordenador;
    var descricao_simulado = req.params.descricao_simulado;
    data={
        id_coordenador: id_coordenador,
        descricao_simulado: descricao_simulado
    };
    //Todos os questionarios da turma e da disciplina
    req.getConnection(function(err,connection){
        connection
        .query("INSERT INTO simulado SET ?",data,(err,rows)=>{
            console.log(rows);
            if(err) console.log("Error saving: %s",err);
            res.send(rows);
        });
    });
};
exports.ligar_questionario_simulado = function(req,res){
    var id_simulado = req.params.id_simulado;
    var id_questionario = req.params.id_questionario;
    data={
        id_simulado: id_simulado,
        id_questionario: id_questionario
    };
    //Todos os questionarios da turma e da disciplina
    req.getConnection(function(err,connection){
        connection
        .query("INSERT INTO simulado_has_oa_questionario SET ?",data,(err,rows)=>{
            console.log(rows);
            if(err) console.log("Error saving: %s",err);
            res.send(rows);
        });
    });
};




// Coordenador

// 1.Procurar um questionário por um id.
// 2.Vincular à turma um simulado.
// 3.Atribuir versões dos questionários aos alunos de cada turma
// (Após item 3 do professor).
// 4.Gerar pacote com o simulado.

// Professor

// 1.Adicionar uma questão vinculada à disciplina.(Done)
// 2.Vincular as questões aos questionários.(Done)
// 3.Gerar as versões dos questionários(Até 25/05).