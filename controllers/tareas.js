//Importar express
const express = require("express");

//Modularizar rutas para el esquema de tareas
const tareasRouter = express.Router(); //modulariza las rutas

const Tareas = require("../models/tarea");

/* ─────────────── GET /api/tareas/:usuarioId ─────────────── */
tareasRouter.get("/", async (req, res) => {
    // const { usuarioID } = req.params;

    try {
        const tareas = await Tareas.find(/*{ usuarioID }*/); // trae todas las tareas
        res.json(tareas); // responde con las tareas en JSON
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
});

tareasRouter.post("/", async (req, res) => {
    const { nombreTarea, usuarioID } = req.body; //Dato que llega del formulario
    //tambien se puede hacer const bodyContains = req.body, esto trae todo lo que tiene la req

    if (!nombreTarea || !usuarioID)
        return res.status(404).json({ error: "Faltan datos" });

    try {
        const nuevaTarea = new Tareas({ nombreTarea, usuarioID }); //Pasando el nombre y el valor la bbdd

        await nuevaTarea.save().then((tareaSave) => {
            if (!tareaSave) {
                return res.status(404).json({
                    message: "La tarea no se ha guardado correctamente",
                });
            }
        });

        return res.status(200).json({
            message: "Tarea agregada exitosamente",
            nuevaTarea,
        });
    } catch (err) {
        console.log(`Algo fallo, el error es: ${err}`);
        throw new Error("Error al cargar la tarea en la Base de Datos");
    }
});

tareasRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Tareas.findByIdAndDelete(id).then((tareaDelete) => {
            if (!tareaDelete) {
                return res.status(404).json({
                    message: "Error al eliminar la tarea",
                });
            }

            return res.status(200).json({
                message: "Tarea eliminada correctamente",
                tareaDelete,
            });
        });
    } catch (err) {
        console.log(`TAREA NO ELIMINADA ERROR ${err}`);
        throw new Error("Error al eliminar la tarea");
    }
});

tareasRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const bodyContains = req.body;

    try {
        await Tareas.findByIdAndUpdate(id, bodyContains, { new: true }).then(
            (tareaUpdated) => {
                if (!tareaUpdated) {
                    return res.status(404).json({
                        message: "Error al actualizar el estatus de la tarea",
                    });
                }

                return res.status(200).json({
                    message: "tarea actualizada correctamente",
                    tareaUpdated,
                });
            }
        );
    } catch (error) {
        console.log(`TAREA NO ACTUALIZADA, ERROR ${err}`);
        throw new Error("Error al actualizar la tarea");
    }
});

module.exports = tareasRouter;
