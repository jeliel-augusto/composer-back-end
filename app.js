var express = require('express');
var app = express();
var http = require ('http');
var path = require ('path');
var connection = require('express-myconnection');
var mysql = require('mysql');

var coordenador = require('./routes/coordenador');
/*OLD CODE*/
var users = require('./routes/user');
var professor = require('./routes/professor');
var aula = require('./routes/aula');
var galeria = require('./routes/galeria');
var questionario = require('./routes/questionario');
var ligacoes = require('./routes/ligacoes');
var pesquisa = require('./routes/pesquisa');

var routes = require('./routes/index');
const fileUpload = require('express-fileupload');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        passsword: '',
        database: 'dbcomposer'
    },'pool')
);


app.set('port', process.env.PORT | 3000);
/*---------COORDENADOR---------*/
app.get('/coordenador/disciplinas/:id_curso&:id_coordenador', coordenador.lista_todas_disciplinas);
app.get('/coordenador/disciplinas/turmas/:id_curso&:id_coordenador&:id_disciplina', coordenador.lista_turmas_disciplina);
app.get('/coordenador/disciplinas/turmas/aulas/:id_disciplina&:id_turma',coordenador.lista_aulas_disciplina_turma);
app.get('/coordenador/disciplinas/turmas/aulas/questionarios/:id_aula',coordenador.lista_questionarios_aula);
// app.post('/coordenador/:id_coordenador&:descricao_simulado',coordenador.criar_simulado);
// app.post('/coordenador/associar/:id_turma&:id_simulado',coordenador.ligar_simulado_turma)
/*-----------------------------*/

app.get('/aula/objetos/:id_aula',aula.lista_questionarios);
app.get('/questionario/questoes/:id_questionario',questionario.listar_questoes_all);
app.get('/questionario/questao/:id_questao',questionario.detalhe_questao);
app.post('/questionario/criar',questionario.criar_questionario);

app.get('/topicos/:pesquisa',pesquisa.topicos);

// app.get('/aula/objetos/especifico/:id_objeto&:tipo',aula.select_especifico);
app.post('/aula/objetos/',aula.save_oas);
// app.post('/imagem/',galeria.save_imagem);
// app.post('/questao/',questionario.save_questao);


app.get('/professor/disciplinas/:id_professor',professor.lista_disciplinas_all);
app.get('/professor/disciplinas/aulas/:id_professor&:id_disciplina',professor.lista_aulas);
app.post('/professor/disciplinas/aulas/criar',professor.criar_aula);
// app.post('/liga/aula/questionario/:id_aula&:id_questionario',ligacoes.liga_questionario_aula);
// app.post('/liga/aula/galeria/:id_aula&:id_galeria',ligacoes.liga_galeria_aula);
// app.post('/liga/aula/video/:id_aula&:id_video',ligacoes.liga_video_aula);
// app.post('/liga/aula/slide/:id_aula&:id_slide',ligacoes.liga_slide_aula);
// app.post('/liga/galeria/imagem/:id_galeria&:id_imagem',ligacoes.liga_imagem_galeria);
// app.post('/liga/questionario/questao/:id_questionario&:id_questao',ligacoes.liga_questao_questionario);

// app.get('/pesquisa/questionario/nome/:pesquisa',pesquisa.questionario);
// app.get('/pesquisa/galeria/nome/:pesquisa',pesquisa.galeria);
// app.get('/pesquisa/slide/nome/:pesquisa',pesquisa.slide);
// app.get('/pesquisa/video/nome/:pesquisa',pesquisa.video);
// app.get('/pesquisa/imagem/nome/:pesquisa',pesquisa.imagem);
// app.get('/pesquisa/questao/nome/:pesquisa',pesquisa.questao);


app.get('/',routes.index);

app.get('/users/',users.list);
app.post('/users/',users.save);
app.get('/users/edit/:id',users.edit);
app.post('/users/edit/:id',users.save_edit);
http.createServer(app).listen(app.get('port'),()=>{
    console.log("Listening on port %s",app.get('port'));
});
