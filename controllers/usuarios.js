//Los controladores se nombran en plural

//Definir el router (es lo que nos permite hacer las operaciones tipo CRUD)

//Creando el router
const userRouter = require("express").Router();

//Crear el modelo

//Conectar al modelo
const user = require("../models/usuario");

//2. Registro del nombre que el usuario ingreso en el formulario
userRouter.post("/", (request, response) => {
    //Cuando ingrese a este metodo es porque se esta llamando desde el js del front, relacionado al formulario, donde quiero relizar el registro

    //Destructuring de lo que se esta enviado
    const { nombre } = request.body;
    console.log(nombre); //Este console log deberia aparecer en la terminal

    //Validaciones a nivel de backend
    if (!nombre) {
        console.log("campos vacios");

        //al realizar esta validacion retorno al frontend que hay un error
        return response.status(400).json({
            error: "Todos los campos son obligatorios",
        });
    } else {
        //Caso en que esta correcto el dato a registrar
        //Luego se debe envairlos a la BD
        console.log(nombre);

        //Enviar los datos a la BD
        let usuario = new user();

        usuario.nombre = nombre;

        async function guardarUsuario() {
            await usuario.save();
            const usuario_consulta = await user.find();
            console.log("test ", usuario_consulta);
        }

        guardarUsuario().catch(console.error());

        return response
            .status(200)
            .json({ mensaje: "se ha creado el usuario" });
    }
});

//userRouter.get();

//Todos los metodos CRUD se pueden usar con user router

module.exports = userRouter;
