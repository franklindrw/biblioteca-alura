import autores from '../models/Autor';

class AutorController {
    static listarAutores = (req: any, res: any) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static listarAutorPorId = (req: any, res: any) => {
        const id = req.params.id;
        autores.findById(id, (err : any, autores: any) => {
            if(err){
                res.status(404).send({message: `falha ao encontrar o autor ${id}: ${err.message}`});
            } else {
                res.status(200).json(autores);
            }
        })
    }

    static cadastrarAutor = (req: any, res: any) => {
        let autor = new autores(req.body);
        autor.save((err) => {
            if(err){
                res.status(500).send({message: `falha ao cadastrar autor: ${err.message}`})
            } else {
                res.status(201).send(autor.toJSON());
            }
        })
    }

    static atualizarAutor = (req: any, res: any) => {
        const id = req.params.id;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err: any) => {
            if(!err) {
                res.status(200).send({message: 'Autor atualizado com sucesso'})
            } else {
                res.status(500).send({message: `Erro ao atualizar o Autor ${id}: ${err.message}`})
            }
        })
    }

    static deletarAutor = (req: any, res: any) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, (err: any) => {
            if(!err){
                res.status(200).send({message: 'Autor excluido com sucesso'})
            } else {
                res.status(500).send({message: `não foi possível excluir o Autor ${id}: ${err.message}`})
            }
        })
    }
}

export default AutorController;