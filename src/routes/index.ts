import express from 'express';
import livros from './livrosRoutes';

const routes = (app: any) => {
    app.route('/').get((req: any, res: any) => {
        res.status(200).send({titulo: "Curso de node"});
    })

    app.use(
        express.json(),
        livros
    )
}

export default routes;