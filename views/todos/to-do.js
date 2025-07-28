/*---------- VARIABLES ---------*/
const user = JSON.parse(localStorage.getItem("usuario")); //Obtiene los datos almacenados en el LS
const formulario = document.querySelector("#form-todos");
const lista = document.querySelector("#todos-list");
const inputF = document.querySelector("#form-input");
const cerrarBtn = document.querySelector("#cerrar-btn");

const notification = document.querySelector(".notification");

const API = "http://localhost:3000/api/tareas"; //Dice que no existe la ruta http://localhost:3000/api/users

// validar si existe un usuario
if (!user) {
    //Si no hay nada en el LS, se cambiar la URL al inicio
    window.location.href = "../";
} else {
    const obtenerLista = async () => {
        // Apunta al controlador
        const respuesta = await fetch(API, {
            method: "GET",
        });

        //El array de respuestas se convierte en un objeto utilizable
        const list = await respuesta.json();

        //Filtra la respuesta en cada posicion valida si el username_id es === al id que esta guardado en el LS
        const userList = list.filter((i) => i.usuarioID === user.id);

        //Por cada tarea crea un li, le otorga el id de su posicion y el texto
        userList.forEach((i) => {
            const listadoTareas = document.createElement("li");
            listadoTareas.innerHTML = `
            <li id=${i._id} data-complete=${i.completado} class="todo-item">
            <button class="delete-btn">&#10006;</button>
            <p>${i.nombreTarea}</p>
            <button class="check-btn">&#10003;</button>
          </li> 
            `;

            //Cada posicion se agrega al listado
            lista.appendChild(listadoTareas);

            // ✅ Verifica si está completado y aplica la clase
            const liCreado = listadoTareas.querySelector("li"); //selecciona la etiqueta li creada
            const estaCompleta = liCreado.dataset.complete === "true"; //valida si tiene el data atribute
            const parrafo = liCreado.querySelector("p"); //Selecciona el p que esta en el li

            //Si el p existe y el dataset esta en complete, apilca la clase al p
            if (estaCompleta && parrafo) {
                parrafo.classList.add("check-todo");
            }
        });
    };

    //Se llaman a la funcion
    obtenerLista();

    //Al enviar el formulario
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        //Obtener los datos de la bbdd
        const respuesta = await fetch(API, {
            method: "GET",
        });

        //Convertir la respuesta a JSON
        const list = await respuesta.json();

        //Buscar las tareas del usuario en especifico
        const userList = list.filter((i) => i.usuarioID === user.id);

        //Buscar si el nombre de la tarea ya esta en la bbdd
        const validar = userList.filter(
            (i) => i.nombreTarea === inputF.value.trim()
            //Preguntarle al prof como hacer bien esta validacion
        );

        //Si el nombre de la ya esta en la BBDD, arroja error
        if (validar.length != 0) {
            return mensaje("La tarea ya existe");
        }

        //Envio al controlador con el metodo POST
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombreTarea: inputF.value.trim(),
                usuarioID: user.id,
            }),
            //Enviamos al controlador la tarea ingresada en el input y se lleva el id del usuario conectado
        });
        limpiarHTML(); //Limpia el HTML
        obtenerLista(); //Llama nuevamente a todos los elementos

        inputF.value = "";
    });

    lista.addEventListener("click", async (e) => {
        e.preventDefault();
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.parentElement.id;

            //Elimina el ID seleccionado de la BD tareas
            await fetch(`http://localhost:3000/api/tareas/${id}`, {
                method: "DELETE",
            });

            e.target.parentElement.remove();
        } else if (e.target.classList.contains("check-btn")) {
            const id = e.target.parentElement.id;

            e.target.parentElement
                .querySelector("p")
                .classList.toggle("check-todo");

            const respuestaJSON = await fetch(
                `http://localhost:3000/api/tareas/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completado: e.target.parentElement
                            .querySelector("p")
                            .classList.contains("check-todo")
                            ? true
                            : false,
                        //Valida si el elemento seleccionado tiene la clase, si la tiene, se la pone en false y si no la tiene, la pone en true
                    }),
                }
            );
            const response = await respuestaJSON.json();
            console.log("La respuesta es: ", response);
        }
    });
}

cerrarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("usuario");

    window.location.href = "../";
});

//Funcion para limpiar HTML
const limpiarHTML = () => {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
};

//Funcion para las notificaciones
function mensaje(texto) {
    notification.textContent = texto;
    notification.classList.add("show-notification");
    setTimeout(() => notification.classList.remove("show-notification"), 5000);
}
