import express from 'express';
import db from './config/conexao';
import routes from './routes/index';

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log("conexão com banco concluída");
})

const app = express();
app.use(express.json());

routes(app);

export default app;