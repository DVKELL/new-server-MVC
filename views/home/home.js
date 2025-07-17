// views/home/home.js

// Elementos del DOM
const formL = document.querySelector("#form-login");
const formC = document.querySelector("#form-create");
const loginInput = document.querySelector("#login-input");
const createInput = document.querySelector("#create-input");
const notification = document.querySelector(".notification");

// URL base del backend
const API = "http://localhost:3000/api/users";

// Muestra mensajes en la notificación
function mensaje(texto) {
  notification.textContent = texto;
  notification.classList.add("show-notification");
  setTimeout(() => notification.classList.remove("show-notification"), 3000);
}

/* ────────────────────────────────
   CREAR USUARIO
──────────────────────────────── */
formC.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = createInput.value.trim();
  if (!nombre) return mensaje("El nombre no puede estar vacío");

  // Traer usuarios existentes
  const lista = await (await fetch(API)).json();
  const existe = lista.some((u) => u.nombre === nombre);
  if (existe) return mensaje(`El usuario "${nombre}" ya existe`);

  // Crear nuevo usuario
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });

  mensaje(`Usuario "${nombre}" registrado`);
  createInput.value = "";
});

/* ────────────────────────────────
   LOGIN
──────────────────────────────── */
formL.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = loginInput.value.trim();
  if (!nombre) return mensaje("Debes escribir tu nombre de usuario");

  const lista = await (await fetch(API)).json();
  const usuario = lista.find((u) => u.nombre === nombre);
  if (!usuario) return mensaje("El usuario no existe");

  mensaje(`¡Bienvenido ${nombre}!`);
  localStorage.setItem("usuario", JSON.stringify(usuario));
  window.location.href = "../tareas/tareas.html";
});
