// controllers/usuarios.js
//
// Controlador muy sencillo para manejar usuarios con MongoDB y Mongoose.
// Solo expone dos rutas:
//   GET  /api/users   → devuelve la lista completa de usuarios
//   POST /api/users   → crea un usuario nuevo
// ───────────────────────────────────────────────────────────────────────

const express = require("express"); //Funciona para crear rutas HTTP
const userRouter = express.Router(); //Permite modularizar rutas

const User = require("../models/usuario"); // Modelo Mongoose (models/usuarios)

/* ───────────────  GET /api/users  ─────────────── */
userRouter.get("/", async (_req, res) => {
    const usuarios = await User.find(); // trae todos los documentos
    res.json(usuarios); // responde en JSON
    //cada vez que alguien ingresa un usuario valido
});

/* ───────────────  POST /api/users ─────────────── */
userRouter.post("/", async (req, res) => {
    const { nombre } = req.body; // dato que llega del formulario

    if (!nombre) {
        // validación mínima
        return res.status(400).json({ error: "Nombre requerido" });
    }

    const nuevoUsuario = new User({ nombre }); // crea el documento
    await nuevoUsuario.save(); // guarda en Mongo
    res.status(201).json(nuevoUsuario); // confirma creación
});

module.exports = userRouter; //Permite usar el router en otras paginas
