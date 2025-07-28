//Llamar a mongoose
const mongoose = require("mongoose");

//Definiendo el esquema para las tareas
const tareaSchema = new mongoose.Schema({
    nombreTarea: {
        type: String,
        trim: true,
    },
    completado: { type: Boolean, default: false },
    usuarioID: {
        type: mongoose.Schema.Types.ObjectId, //El ID de cada usuario creado por mongo
        ref: "users", //Referencia al esquema de usuarios
    },
});

//Instanciar el esquema de tareas
const tareas = mongoose.model("tareas", tareaSchema);

//Exportando el modelo de tareas
module.exports = tareas;
