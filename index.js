//Inicializo express
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./controllers/usuarios");
const tareasRouter = require("./controllers/tareas");
require("dotenv").config();

const PORT = 3000;

// ---------------- BBDD ----------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error(err));

// ------------- Middleware -------------
app.use(express.json());

// ------------- Rutas frontend ----------
app.use("/", express.static(path.resolve("views", "home")));
app.use("/tareas", express.static(path.resolve("views", "tareas")));

// ------------- Rutas backend -----------
app.use("/api/users", userRouter);
app.use("/api/tareas", tareasRouter);


// ------------- Arrancar servidor -------
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);

module.exports = app;
