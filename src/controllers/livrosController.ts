import livros from '../models/Livro';

class LivroController {
    static listarLivros = (req: any, res: any) => {
        livros.find((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static listarLivroPorId = (req: any, res: any) => {
        const id = req.params.id;
        livros.findById(id, (err : any, livros: any) => {
            if(err){
                res.status(404).send({message: `falha ao encontrar o livro ${id}: ${err.message}`});
            } else {
                res.status(200).json(livros);
            }
        })
    }

    static cadastrarLivro = (req: any, res: any) => {
        let livro = new livros(req.body);
        livro.save((err) => {
            if(err){
                res.status(500).send({message: `falha ao cadastrar livro: ${err.message}`})
            } else {
                res.status(201).send(livro.toJSON());
            }
        })
    }

    static atualizarLivro = (req: any, res: any) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err: any) => {
            if(!err) {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
            } else {
                res.status(500).send({message: `Erro ao atualizar o Livro ${id}: ${err.message}`})
            }
        })
    }

    static deletarLivro = (req: any, res: any) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err: any) => {
            if(!err){
                res.status(200).send({message: 'livro excluido com sucesso'})
            } else {
                res.status(500).send({message: `não foi possível excluir o livro ${id}: ${err.message}`})
            }
        })
    }
}

export default LivroController;