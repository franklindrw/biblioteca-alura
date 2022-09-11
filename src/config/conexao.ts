import mongoose from "mongoose";

mongoose.connect("mongodb+srv://facampos:93YmNbwJ7joqKVvx@franxx-db.gzct9af.mongodb.net/biblioteca-alura");

let db = mongoose.connection;

export default db;