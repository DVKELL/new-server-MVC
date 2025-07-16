const express = require("express");
const axios = require("axios");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const path = require("path");
const userRouter = require("./controllers/usuarios");
require("dotenv").config();

// app.get("/", (request, response) => {
//     response.send("Servidor Express funcionando");
// });

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//conexion a la bd
try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log(`conectado a mongo`);
} catch (error) {
    console.log(error);
}

//RUTAS DE FRONTEND
//Solo usar nombres de carpetas
app.use("/", express.static(path.resolve("views", "home")));
app.use("/tareas", express.static(path.resolve("views", "home")));
app.use("/controllers", express.static(path.resolve("controllers")));

//SUPER IMPORTANTE
app.use(express.json());

//RUTAS BACKEND
app.use("/api/users", userRouter);

module.exports = app;
