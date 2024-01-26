// Asegúrate de que estás cargando el script después de que se haya cargado el DOM
document.addEventListener('DOMContentLoaded', function() {
  // Array de usuarios registrados (almacenados en el localhost)
  let usersData = localStorage.getItem("usersData")
    ? JSON.parse(localStorage.getItem("usersData"))
    : [];
  // Array de tareas (almacenadas en el localhost)
  let tasksData = localStorage.getItem("tasksData")
    ? JSON.parse(localStorage.getItem("tasksData"))
    : [];
  // Array de usuario logueado (almacenados en el locahost)
  let usuarioSesion = localStorage.getItem("usuarioLogueado");
  
console.log(usuarioSesion);

  // Elementos del DOM
  const loginButton = document.querySelector(".loginButton");
  const registerButton = document.querySelector(".registerButton");
  const pageRegisterButton = document.querySelector(".pageRegisterButton");
  const pageLoginButton = document.querySelector(".pageLoginButton");
  const cerrarSesionButton = document.querySelector(".cerrarSesionButton");
  const nombreUsuarioElement = document.getElementById("nombreUsuario");
  const tareaNuevaInput = document.querySelector(".tareaNueva");
  const nuevaTareaButton = document.querySelector(".nuevaTareaButton");

  const mostrarTareasCompletadasCheckbox = document.getElementById(
    "mostrarTareasCompletadas"
  );
  const spanCompletadasElement = document.getElementById("spanCompletadas");
  const spanPendientesElement = document.getElementById("spanPendientes");
  const listaTareasElement = document.getElementById("listaTareas");
  // Función para mostrar el formulario de acceso y ocultar el de registro
  function showLoginForm() {
    document.querySelector(".login").classList.remove("oculto");
    document.querySelector(".registro").classList.add("oculto");
  }

  // Función para mostrar el formulario de registro y ocultar el de acceso
  function showRegisterForm() {
    document.querySelector(".registro").classList.remove("oculto");
    document.querySelector(".login").classList.add("oculto");
  }
  let sesion
// Comprobar sesion iniciada
    if (usuarioSesion) {
      sesion=true
      let userSesion = JSON.parse(usuarioSesion);
      //inicia la sesion automaticamente del usuario logueado si refresca la pagina
      iniciarSesion(userSesion[0].usuario, userSesion[0].clave);
    }else{
      sesion=false
    }


  // Función para cerrar sesión
  function cerrarSesion() {
    // Limpia los datos de sesión
    nombreUsuarioElement.textContent = "";
    tareaNuevaInput.value = "";
    listaTareasElement.innerHTML = "";
    mostrarTareasCompletadasCheckbox.checked = false;
    //eliminar variable usuarioLogueado del locastorage
    localStorage.removeItem("usuarioLogueado")
    // Oculta el área principal y muestra el formulario de acceso
    document.querySelector(".main").classList.add("oculto");
    document.querySelector(".acceso").classList.remove("oculto");
  }

  // Función para iniciar sesión
  function iniciarSesion(usuario, clave) {
    
    const user = usersData.find(
      (u) => u.usuario === usuario && u.clave === clave
    );

    if (user) {
      // Muestra el área principal
      document.querySelector(".main").classList.remove("oculto");
      document.querySelector(".acceso").classList.add("oculto");

      //crea el usuarioLogueado si no lo estaba
      if (!sesion) {
        console.log(1);
        localStorage.setItem("usuarioLogueado", JSON.stringify([user]));
      }

      // Muestra el nombre del usuario
      nombreUsuarioElement.textContent = usuario;
      let usuarioActual = nombreUsuarioElement.textContent;
      // Actualiza el contador de tareas completadas y pendientes
      actualizarContadoresTareas();

      // Filtra las tareas del usuario actual y las almacena en una variable
      let tareasDelUsuarioPendientes = tasksData.filter(
        (tarea) => tarea.propietario === usuarioActual && !tarea.completado
      );
      // pinta las tareas del usuario actual pendientes
      pintarTareas(tareasDelUsuarioPendientes);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  // Función para registrar un nuevo usuario
  function registrarUsuario() {

    fetch('consultas.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showLoginForm();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

  // Función para agregar una nueva tarea
  function agregarTarea(nombreTarea, id) {
    // Obtiene el nombre del usuario actual
    const usuarioActual = nombreUsuarioElement.textContent;
    // Agrega la nueva tarea al array de tareas
    tasksData.push({
      nombre: nombreTarea,
      completado: false,
      propietario: usuarioActual,
      id: id
    });
    // Almacena los datos en el localStorage
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    // Actualiza los contadores de tareas
    actualizarContadoresTareas();
    // pinta las tareas
    mostrarTareasCompletadasOPendientes();
  }

  // funcion pintar tareas
  function pintarTareas(tareas) {
    const usuarioActual = nombreUsuarioElement.textContent;
    listaTareasElement.innerHTML = "";
    let tareaUsuario = tareas.filter((t) => t.propietario === usuarioActual);
    tareaUsuario.forEach((tarea) => {
      let tareaDiv = document.createElement("div");
      tareaDiv.classList.add("tarea");
      tareaDiv.style.backgroundColor = tarea.completado ? "green" : "red";
      tareaDiv.innerHTML = `<p data-id='${tarea.id}'>${tarea.nombre}</p> <button class="botones completarTarea">Completar</button><button class="botones eliminarTarea">Eliminar</button>`;
      listaTareasElement.appendChild(tareaDiv);
    });
  }
  // funcion pintar tareas pendientes

  // Función para actualizar los contadores de tareas completadas y pendientes
  function actualizarContadoresTareas() {
    let usuarioActual = nombreUsuarioElement.textContent;

    let tareasPendientes = tasksData.filter(
      (t) => t.propietario === usuarioActual && !t.completado
    );
    let tareasCompletadas = tasksData.filter(
      (t) => t.propietario === usuarioActual && t.completado
    );
    spanCompletadasElement.textContent = tareasCompletadas.length;
    spanPendientesElement.textContent = tareasPendientes.length;
  }


  // Función para mostrar tareas completadas


  function mostrarTareasCompletadasOPendientes() {
    const usuarioActual = nombreUsuarioElement.textContent;



  let tareasCompletadasUsuarioActual = tasksData.filter(
    (t) => t.propietario === usuarioActual && t.completado
    );
    let tareasPendientesUsuarioActual = tasksData.filter(
      (t) => t.propietario === usuarioActual && !t.completado
    );


    // Lógica para mostrar/ocultar tareas completadas según el estado del checkbox
    if (mostrarTareasCompletadasCheckbox.checked) {
      // Muestra las tareas completadas
      pintarTareas(tareasCompletadasUsuarioActual);
    } else {
      // Oculta las tareas completadas
      pintarTareas(tareasPendientesUsuarioActual);
    }
  }

function okOrRemoveTarea(event) {
  const target = event.target;
  const targetText = target.textContent;
  const taskId =
    targetText === "Eliminar" ? target.previousElementSibling.previousElementSibling.getAttribute("data-id") : target.previousElementSibling.getAttribute("data-id");

  const task = tasksData.find((t) => t.id === taskId);
  const taskIndex = tasksData.findIndex((t) => t.id === taskId);

  if (targetText === "Eliminar") {
    tasksData.splice(taskIndex, 1);
      pintarTareas(tasksData);
  } else if (targetText === "Completar") {
    task.completado = true;
      pintarTareas(tasksData);
  }

  localStorage.setItem("tasksData", JSON.stringify(tasksData));
  actualizarContadoresTareas();
  mostrarTareasCompletadasOPendientes();
}



  // Eventos

  // Botón de login
  loginButton.addEventListener("click", function () {
    const usuarioInputLogin = document.getElementById("usuarioInputLogin").value;
    const claveInputLogin = document.getElementById("claveInputLogin").value;
    iniciarSesion(usuarioInputLogin, claveInputLogin);
  });

  // Botón de registro
  registerButton.addEventListener("click", registrarUsuario);

  // Botón para cambiar a la página de registro
  pageRegisterButton.addEventListener("click", showRegisterForm);

  // Botón para cambiar a la página de login
  pageLoginButton.addEventListener("click", showLoginForm);

  // Botón para cerrar sesión
  cerrarSesionButton.addEventListener("click", cerrarSesion);

  // boton para completar o eliminar tarea
  listaTareasElement.addEventListener("click", okOrRemoveTarea);

  // Botón para agregar una nueva tarea
  nuevaTareaButton.addEventListener("click", function () {
    const nuevaTareaValor = tareaNuevaInput.value.trim();
    if (nuevaTareaValor !== "") {
      tareaNuevaInput.value = "";
      agregarTarea(nuevaTareaValor, Date());
    }
  });

  // Checkbox para mostrar tareas completadas
  mostrarTareasCompletadasCheckbox.addEventListener(
    "change",
    mostrarTareasCompletadasOPendientes
  );
});