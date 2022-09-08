import express from 'express';
import db from './config/conexao';

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("conexão com banco concluída");
})

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        'titulo': 'Senhor dos Aneis'
    },
    {
        id: 2,
        'titulo': 'O hobbit'
    }
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    let idLivro = parseInt(req.params.id);
    let index = buscaLivro(idLivro);

    res.json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso!');
})

app.put('/livros/:id', (req, res) => {
    let idLivro = parseInt(req.params.id);
    let index = buscaLivro(idLivro);
    livros[index].titulo = req.body.titulo;

    res.json(livros);
});

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(parseInt(id));

    livros.splice(index, 1);

    res.send(`Livro ${id} removido com sucesso!`);
})

function buscaLivro(id : number){
    return livros.findIndex(livro => livro.id === id);
};

export default app;