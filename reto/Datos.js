//funcion para obtener los datos con fetch y necesario token
async function obtenerDatos() {
  empresas = $('#dCharts').children('div');
  respuesta = await fetch('http://192.168.1.136/api/datos', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});
  datos = await respuesta.json();
  for (let i = 0; i < empresas.length; i++) {
    for (let j = 0; j < datos.length; j++) {
      //Cambio de color comparando las empresas con el campo nombres de la tabla
      var emp = document.getElementById(empresas[i].id + 'Valor').innerHTML;
      if (empresas[i].id === datos[j].nombres) {
        if (parseFloat(document.getElementById(empresas[i].id + 'Valor').innerHTML)-0.001 > datos[j].valores) {
          document.getElementById(empresas[i].id + 'Valor').style.color = "red";
          setTimeout(function () {
            document.getElementById(empresas[i].id + 'Valor').style.color = "black";
          }, 5000);
        } else if (parseFloat(document.getElementById(empresas[i].id + 'Valor').innerHTML)+0.001 < datos[j].valores) {
          document.getElementById(empresas[i].id + 'Valor').style.color = "green";
          //Regresar a color negro pasador 5 segundos
          setTimeout(function () {
            document.getElementById(empresas[i].id + 'Valor').style.color = "black";
          }, 5000);
        } else {
          document.getElementById(empresas[i].id + 'Valor').style.color = "black";
        }
        document.getElementById(empresas[i].id + 'Valor').innerHTML = datos[j].valores.toFixed(2);
      }
    }
  }
}
//Ejecutar obtener datos cada minuto para actualizar
setInterval(function(){
obtenerDatos();
}, 60000);

//Empresas
//Consultar el localstorage para comprobar si este usuario tiene empresas seleccionadas
function ClocalStorage() {
  localEmail = localStorage.getItem('email');
  console.log('email')
  if (localStorage.getItem(localEmail + ' empresasGuardadas') != null && localStorage.getItem(localEmail + ' empresasGuardadas') != '') {
    empresasSplit = localStorage.getItem(localEmail + ' empresasGuardadas').split(',')
    for (i = 0; i < empresasSplit.length; i++) {
      $('#selecEmpresas').append($('<img class="empresa ui-draggable ui-draggable-handle" id="' + empresasSplit[i] + '" src="Imagenes/' + empresasSplit[i] + '.png" alt="Logo de ' + empresasSplit[i] + '">'));
    }
    mostrarEmpresas()
    $('#selecEmpresas').empty();
  }
}
//Boton para regresar a la seleccion de empresas y quitar las cards
$('#volver').click(function () {
  $('#dCharts').empty();
  $('#empresas').css('display', 'block');
  $('#selecEmpresas').css('display', 'block');
  $('.mostrar').css('display', 'block');
  $('#verEmpresas').removeClass('d-none');
  $('#verEmpresas').addClass('d-inline');
  $('#volver').addClass('d-none');

});
//Boton para ver las empresas seleccionadas y quitar el otro contenido de la pagina
$('#verEmpresas').click(mostrarEmpresas);
function mostrarEmpresas() {
  obtenerDatos();
  $('.mostrar').css('display', 'none');
  $('#volver').removeClass('d-none');
  $('#verEmpresas').removeClass('d-inline');
  $('#verEmpresas').addClass('d-none');
  empresas = $('#selecEmpresas').children('img');
  empresasParaGuardar = new Array();
  //Generar cards
  for (i = 0; i < empresas.length; i++) {
    $('#dCharts').append('<div id=' + empresas[i].id + ' class="col-xl-3 col-lg-3 col-md-4 col-sm-6 mx-auto px-3 py-3"><div class="card bg-primary-subtle cartas"><img src="imagenes/' + empresas[i].id + '.png" class="card-img-top h-25 w-75 mx-auto" alt="Logo de' + empresas[i].id + '"><div class="card-body"><h2 id=' + empresas[i].id + 'Valor class="card-title valor-texto"> "AQUI"</h2><button id="' + empresas[i].id + '" onClick="mostrarGrafica(this.id)" class="summonModal btn btn-success">Mostrar gráfico</button></div></div></div>');
    empresasParaGuardar[i] = empresas[i].id;
  }
  $('#empresas').css("display", "none");
  $('#selecEmpresas').css("display", "none");
  localStorage.setItem(localEmail + ' empresasGuardadas', empresasParaGuardar);
  prepararModal();
  }


$('.empresa').draggable({
  helper: 'clone',
});

$('#selecEmpresas').droppable({
  accept: '.empresa',
  hoverClass: 'hovering',
  drop: function (ev, ui) {
    {
      ui.draggable.detach();
      $(this).append(ui.draggable);
    }

  }
});

$('#empresas').droppable({
  accept: '.empresa',
  hoverClass: 'hovering',
  drop: function (ev, ui) {
    ui.draggable.detach();
    $(this).append(ui.draggable);
  }
});

async function mostrarGrafica(empresa) {
console.log(empresa);

//Fetch para obtener los datos de la tabla de historico para visaulizar en la grafica
await fetch('http://192.168.1.136/api/obtenerHistorico', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    var fechas = [];
    var valores = [];

    var d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    testFecha = new Date(d);
    for (let i = 0; i < data.length; i++) {
      if (empresa === data[i].nombres) {
        fechas.push(data[i].Fecha);
        valores.push(data[i].valores);
      }
    }

    console.log(valores + ' - ' + fechas);

    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: empresa
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%Y-%m-%d}',
          rotation: 45,
          align: 'left'
        }
      },
      yAxis: {
        id: 'y_axis_0'
      },
      series: [
        {
          type: 'line',
          data: valores,
          yAxis: 1,
          tooltip: {
            valueDecimals: 2
          },
          pointStart: Date.parse(testFecha),
          pointInterval: 24 * 3600 * 1000,
          yAxis: 'y_axis_0'
        }
      ]
    });
  });

modal.style.display = 'block';
}

function prepararModal() {
  modal = document.getElementById("myModal");
  // Obtener el botón que abre el modal
  // Obtener el elemento <span> que cierra el modal
  var span = document.getElementsByClassName("close")[0];
  // Cuando el usuario haga clic en el botón, abra el modal
  // Cuando el usuario haga clic en <span> (x), cierre el modal
  // Cuando el usuario haga clic fuera del modal, cierre el modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

    }
  }
}
