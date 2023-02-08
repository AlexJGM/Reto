//Iniciar sesion
function iniciarSesion() {

  setInterval(function () {
    if (!localStorage.getItem("token")) {
      // Si no hay un token de inicio de sesión mostrar el formulario de inicio de sesión
      let divf = document.getElementById("form");
      divf.style.display = "block";
      document.querySelector("#registrarse").addEventListener("click", function () {
        document.querySelector("#loginF").style.display = "none";
        document.querySelector("#formR").style.display = "block";

      });

      document.querySelector('#Loguearse').addEventListener('click', function () {
        document.querySelector("#loginF").style.display = "block";
        document.querySelector("#formR").style.display = "none";
      });

      let cont = document.getElementById("contenedor");
      cont.classList.add("blur");
    }
  }, 1000)

  if (localStorage.getItem("token")) {
    // Hay un usuario logueado
    console.log("Usuario logueado");
    var bienvenido = document.getElementById("Bienvenido");
    var user = localStorage.getItem("usuario");
    bienvenido.innerHTML = "<h1> <a class='p1'> Bienvenido </a>" + " " + "<a class='p2'>" + user + "</a></h1>"

    var ibex = document.getElementById("botones");
    ibex.innerHTML = "<button class='btn btn-success' id='logoutBtn'>Cerrar Sesion</button>";
    //Cerrar sesión
    var logout = document.getElementById("logoutBtn");
    logout.addEventListener("click", function () {
      // Elimina la información del usuario logueado del navegador
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      // Recargar pagina
      location.reload();
    })

    document.getElementById("boton").style.display = "block";
    ClocalStorage();
  } else {
    // No hay un usuario logueado
    console.log("No hay un usuario logueado");
  }
}

//Loguearse
formulario = document.getElementById('loguear');
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  var datal = new FormData(formulario);
  // Agrega los datos del usuario a un objeto
  var userData = {
    email: datal.get("email"),
    password: datal.get("password")
  };
  // Envia los datos del usuario al servidor
  fetch('http://192.168.1.136/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      responseGlobal = response;

      var error = document.getElementById("error");
      var inicio = document.getElementById("inicio");
      localStorage.removeItem("usuario");
      if (response.status === "success") {
        console.log("Usuario encontrado, iniciando sesión...");
        // Código para iniciar sesión del usuario y guardar datos
        let token = response.authorisation.token;
        let usuario = response.user.name;
        let email = response.user.email
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("email", email);
        //alert(usuario);

        error.innerHTML = "";
        inicio.innerHTML = "Usuario encontrado, iniciando sesion...";
        inicio.style.color = "green";
        location.reload();

      } else {
        console.log("Usuario no encontrado, verifica tus credenciales");
        error.innerHTML = "Usuario o contraseña incorrectos revise los datos";
        error.style.color = "red";
        // Código para mostrar un error al usuario
      }
    })
    .catch(err => console.error(err));
});

//Registrar un usuario
formularioR = document.getElementById('registrar');
formularioR.addEventListener("submit", function (event) {
  event.preventDefault();
  //mandar datos del formulario 
  var data = new FormData(formularioR);
  const options = { method: 'POST', body: data };
  fetch('http://192.168.1.136/api/register', options)
    .then(response => response.json())
    .then(response => {
      //.catch(err => console.error(err));
      console.log(response);
      if (response.status === "success") {
        var registrado = document.getElementById("registrado")
        registrado.innerHTML = "Usuario registrado";
        registrado.style.color = "green";
        formularioR.reset();
        setTimeout(function () {
          registrado.innerHTML = "";
          registrado.style.color = "";
        }, 1500);
      } else {
        console.log("Correo en uso");

      }
    })
    //Si es correo ya existe mostrar mensaje
    .catch(error => {
      console.log('Error: ', error);
      registrado.innerHTML = "correo ya en uso";
      registrado.style.color = "red";
    })

});
//Forma alternativa de cerrar sesion

//Cerrar sesion
/*
  var salir = document.getElementById("salir");
    salir.addEventListener("click", function(){
    fetch("http://127.0.0.1:8000/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then(response => response.json())
  .then(data => {
    //cerrar sesion
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    //Recargar pagina
    window.location.reload();
  })
  .catch(error => {
    console.error(error);
  });
});
*/