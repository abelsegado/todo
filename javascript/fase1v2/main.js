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

  // Función para cerrar sesión
  function cerrarSesion() {
    // Limpia los datos de sesión
    nombreUsuarioElement.textContent = "";
    tareaNuevaInput.value = "";
    listaTareasElement.innerHTML = "";
    mostrarTareasCompletadasCheckbox.checked = false;
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
      // Muestra el nombre del usuario
      nombreUsuarioElement.textContent = usuario;
      // Actualiza el contador de tareas completadas y pendientes
      actualizarContadoresTareas();
      // pinta las tareas
      pintarTareas(tasksData);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  // Función para registrar un nuevo usuario
  function registrarUsuario(nombre, usuario, clave, confirmarClave) {
    // Verifica que las contraseñas coincidan
    if (clave === confirmarClave) {
      // Verifica que el usuario no exista
      if (!usersData.some((u) => u.usuario === usuario)) {
        // Agrega el nuevo usuario al array
        usersData.push({ nombre, usuario, clave });
        // Almacena los datos en el localStorage
        localStorage.setItem("usersData", JSON.stringify(usersData));
        // Muestra el formulario de acceso
        showLoginForm();
      } else {
        alert("El usuario ya existe");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
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
    pintarTareas(tasksData);
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

  // Función para actualizar los contadores de tareas completadas y pendientes
  function actualizarContadoresTareas() {
    const usuarioActual = nombreUsuarioElement.textContent;

    const tareasPendientes = tasksData.filter(
      (t) => t.propietario === usuarioActual && !t.completado
    );
    spanCompletadasElement.textContent = tasksData.length-tareasPendientes.length -1;
    spanPendientesElement.textContent = tareasPendientes.length;
  }

  // Función para mostrar tareas completadas
  function mostrarTareasCompletadas() {
    const usuarioActual = nombreUsuarioElement.textContent;


let tareasCompletadasUsuarioActual = tasksData.forEach(t => {
  if (t.propietario === usuarioActual && t.completado === true) {
    console.log(t);
  }
});
    // Lógica para mostrar/ocultar tareas completadas según el estado del checkbox
    if (mostrarTareasCompletadasCheckbox.checked) {
      // Muestra las tareas completadas
      console.log("Tareas Completadas:", tareasCompletadasUsuarioActual);
    } else {
      // Oculta las tareas completadas
      console.log("Mostrar Tareas Pendientes");
    }
  }

  // Función para completar una tarea
  function okOrRemoveTarea(puntero) {
    
    let target = puntero.target;

    let targetTarea = puntero.target.textContent;

    let punteroID
    if (targetTarea == "Eliminar") {
      punteroID = target.previousElementSibling.previousElementSibling.getAttribute("data-id");
    } else if (targetTarea == "Completar") {
      punteroID = target.previousElementSibling.getAttribute("data-id");
    }

      let tarea = tasksData.find((t) => t.id === punteroID);
      let idTarea = tarea.id;
      console.log(punteroID,idTarea);
      let posicionTarea = tasksData.findIndex((t) => t.id === punteroID);


      if (targetTarea=="Eliminar") {
        console.log(tarea,posicionTarea);
        tasksData.splice(posicionTarea,1)
      }else if(targetTarea=="Completar"){
       console.log(tarea, posicionTarea);
        // Marca la tarea como completada
        tarea.completado = true;
      }


      // Almacena los datos actualizados en el localStorage
      localStorage.setItem("tasksData", JSON.stringify(tasksData));

      // Actualiza los contadores de tareas
      actualizarContadoresTareas();
      // pinta las tareas
      pintarTareas(tasksData);

    
  }



  // Eventos

  // Botón de login
  loginButton.addEventListener("click", function () {
    const usuarioInputLogin =
      document.getElementById("usuarioInputLogin").value;
    const claveInputLogin = document.getElementById("claveInputLogin").value;
    iniciarSesion(usuarioInputLogin, claveInputLogin);
  });

  // Botón de registro
  registerButton.addEventListener("click", function () {
    const nombreInput = document.getElementById("nombreInput").value;
    const usuarioInput = document.getElementById("usuarioInput").value;
    const claveInput = document.getElementById("claveInput").value;
    const confirmarClaveInput = document.getElementById(
      "confirmarClaveInput"
    ).value;
    registrarUsuario(
      nombreInput,
      usuarioInput,
      claveInput,
      confirmarClaveInput
    );
  });

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
    mostrarTareasCompletadas
  );
});
