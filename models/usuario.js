//Los modelos se nombran en singular

//Llamar a mongoose
const mongoose = require("mongoose");

// Definir el esquema para el usuario
const usuarioSchema = new mongoose.Schema({
    nombre: String,
});


//Configurar la respuesta del usuario en el esquema
usuarioSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
    },
});

//Registrar el modelo //Contiene la BBDD
const users = mongoose.model("users", usuarioSchema);


//Exportando el modelo de usuarios
module.exports = users;

