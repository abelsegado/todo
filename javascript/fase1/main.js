// DOM
let loginButton = document.querySelector(".loginButton"),
pageRegisterButton = document.querySelector(".pageRegisterButton"),
registerButton = document.querySelector(".registerButton"),
pageLoginButton = document.querySelector(".pageLoginButton"),
cerrarSesionButton = document.querySelector(".cerrarSesionButton"),
nuevaTareaButton = document.querySelector(".nuevaTareaButton");

let capaLogin = document.querySelector(".login"),
  capaRegistro = document.querySelector(".registro"),
  capaAcceso = document.querySelector(".acceso"),
  capaPrincipal = document.querySelector(".main");

// VARIABLES
let usuarios;
let usuarioLogueado="";
let nombreLogueado="";
let sesionIniciada=false;
let usuariosRegistrado = {
  nombre: "",
  usuario: "",
  clave: "",
};
// FUNCIONES PRINCIPALES
function main() {
  sesionIniciada = true;
  capaRegistro.classList.add("oculto");
  capaLogin.classList.add("oculto");
  capaAcceso.classList.add("oculto");
  capaPrincipal.classList.remove("oculto");
  actualizarTareas();
  console.log('tareas actualizadas');
}
function acceso() {
  sesionIniciada = false;
  usuarioLogueado="";
  capaRegistro.classList.add("oculto");
  capaLogin.classList.remove("oculto");
  capaPrincipal.classList.add("oculto");
}
function cerrarSesion() {
  sesionIniciada=false;
  usuarioLogueado="";
  capaAcceso.classList.remove("oculto");
  capaPrincipal.classList.add("oculto");
}

  if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log('hay usuarios registrados')
  }else{
    usuarios = []
    console.log('no hay registros de usuarios');
  }
  if (sesionIniciada) {
    main()
  }else{
    acceso()
  }
  document.querySelector(".cerrarSesionButton").addEventListener("click", function () {
    cerrarSesion()
  });
    document.querySelector(".pageRegisterButton").addEventListener("click", function () {
    document.querySelector(".login").classList.add("oculto");
    document.querySelector(".registro").classList.remove("oculto");
  });
    document.querySelector(".pageLoginButton").addEventListener("click", function () {
    document.querySelector(".registro").classList.add("oculto");
    document.querySelector(".login").classList.remove("oculto");
  });






document.querySelector(".registerButton").addEventListener("click", function () {
  let nombre = document.getElementById("nombreInput").value.trim();
  let usuario = document.getElementById("usuarioInput").value.trim();
  let clave = document.getElementById("claveInput").value.trim();
  let confirmarClave = document.getElementById("confirmarClaveInput").value.trim();

    
    if (nombre === "" || usuario === "" || clave === "" || confirmarClave ==="") {
      alert("Los campos son obligatorios");
      return
    }
    if (clave !== confirmarClave) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return
    }
    if (usuarios.find((usu) => usu.usuario === usuario)) {
      alert("Usuario ya registrado. Prueba con otro nombre de usuario.");
      return;
    }

    usuariosRegistrado = {
      nombre:nombre,
      usuario:usuario,
      clave:clave,
    };
    usuarios.push(usuariosRegistrado);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario registrado correctamente");

    document.getElementById("nombreInput").value = "";
    document.getElementById("usuarioInput").value = "";
    document.getElementById("claveInput").value = "";
    document.getElementById("confirmarClaveInput").value = "";

    document.querySelector(".registro").classList.toggle("oculto");
    document.querySelector(".login").classList.toggle("oculto");
});


document.querySelector(".loginButton").addEventListener("click", function () {
  usuarioLogueado = document.getElementById("usuarioInputLogin").value.trim();
  let clave = document.getElementById("claveInputLogin").value.trim();


  if (usuarios.find((usu) => usu.usuario === usuarioLogueado && usu.clave == clave)) {
    sesionIniciada = true;

    usuarios.forEach((usu) => {
      if (usu.usuario == usuarioLogueado) {
        nombreLogueado = usu.nombre;
        document.getElementById("nombreUsuario").innerHTML = nombreLogueado;
      }
    });
    // Se muestra página principal
      document.querySelector(".acceso").classList.toggle("oculto");
      document.querySelector(".main").classList.toggle("oculto");
    

  } else {
    alert("Usuario no encontrado. Por favor, verifica tus credenciales.");
    return
  }

})



  let tareaNuevaInput = document.querySelector(".tareaNueva");
  let tareasContainer = document.querySelector(".tareas");
  let nuevaTarea={
    nombre:"",
    completada:false,
    propietario:""
  }

  function obtenerTareas() {
    return localStorage.getItem("tareas");
  }

  function actualizarTareas() {
    let tarea = obtenerTareas();
    let tareas = JSON.parse(localStorage.getItem("tareas"))||[];
    tareas.forEach(function (t) {
      agregarTarea(t);
    });
  }


  function agregarTarea(tarea, id) {
    let tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tarea");
    tareaDiv.dataset.id = id;
    tareaDiv.style.backgroundColor = tarea.completada ? "green" : "red";
    tareaDiv.innerHTML = `<p>${tarea.nombre}</p> <button class="botones completar">Completar</button><button class="botones eliminar">Eliminar</button>`;
    tareasContainer.appendChild(tareaDiv);
  }
  

  function agregarNuevaTarea() {

    let nuevaTareaNombre = tareaNuevaInput.value.trim();
    if (nuevaTareaNombre !== "") {

      // let tarea = obtenerTareas();
      let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
      nuevaTarea = {
        nombre: nuevaTareaNombre,
        completada: false,  
        propietario: nombreLogueado
      };
      tareas.push(nuevaTarea);
      actualizarTareas();
      actualizarTareas(tareas);
      agregarTarea(nuevaTarea, nuevaTarea.nombre);
      tareaNuevaInput.value = "";
    }
  }
  nuevaTareaButton.addEventListener("click", agregarNuevaTarea);


  function actualizarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas)||[]);
  }


  // function completarTarea(index) {
  //   tareas[index].completada = !tareas[index].completada;
  //   actualizarTareas(tareas);
  //   actualizarTareas();
  // }

  // function eliminarTarea(index) {
  //   tareas.splice(index, 1);
  //   actualizarTareas(tareas);
  //   actualizarTareas();
  // }



  // tareasContainer.addEventListener("click", function (event) {
  //   let target = event.target;
  //   if (target.classList.contains("completar")) {
  //     let tareaDiv = target.closest(".tarea");
  //     completarTarea(parseInt(tareaDiv.dataset.id));
  //   } else if (target.classList.contains("eliminar")) {
  //     let tareaDiv = target.closest(".tarea");
  //     eliminarTarea(parseInt(tareaDiv.dataset.id));
  //   }
  // });

  actualizarTareas();



