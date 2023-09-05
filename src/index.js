import express from 'express';
import db from './utils/database.js';
import User from './models/user.model.js';
import 'dotenv/config'

User;

const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 8000;

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log('base de datos sincronizadas'))
  .catch(error => console.log(error));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Bienvenido al server" });
});

//Create user
//Cuando se haga una request a /users

app.get("/users", async ( req, res ) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get("/users/:id", async ( req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        user === null ? res.status(400).json({ message: `Usuario ${id} no encontrado` }) : res.status(200).json(user);
        
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/users", async ( req, res ) => {
    try {
        const { body } = req;
        //mandar la info a la base de datos
        // INSER INTO users (username, email, password...)
        const user = await User.create(body);
        res.status(201).json({ Message: `Usuario creado`, user });
    } catch (error) {
        res.status(400).json({message: error})
    }
});

app.put("/users/:id", async ( req, res ) => {
   try {
        const { id } = req.params;
        const { body } = req; 
        const user = await User.update(body, {
            where: { id: id }, // es lo mismo --> where: { id }
        });
        res.status(200).json({Message: `Datos del usuario cambiado`})
   } catch (error) {
        res.status(400).json(error);
   } 
});

app.delete("/users/:id", async( req, res ) => {
    try {
        const { id } = req.params;
         const user = await User.destroy({
            where: { id: id },
         });
         res.status(204).end()
    } catch (error) {
         res.status(400).json(error);
    } 
 });

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
});