//Importar express
const express = require("express");

//Modularizar rutas para el esquema de tareas
const tareasRouter = express.Router();

const Tareas = require("../models/tarea");

/* ─────────────── GET /api/tareas/:usuarioId ─────────────── */
tareasRouter.get("/", async (req, res) => {
    // const { usuarioID } = req.params;

    try {
        const tareas = await Tareas.find(/*{ usuarioID }*/); // filtra por usuario
        res.json(tareas); // responde con las tareas en JSON
        console.log(tareas); //Deberia mostrar las taras por consola
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
});

tareasRouter.post("/", async (req, res) => {
    const { tareaNombre } = req.body; //Dato que llega del formulario

    if (!tareaNombre) return res.status(404).json({ error: "tarea requerida" });

    console.log(tareaNombre);
});

module.exports = tareasRouter;
