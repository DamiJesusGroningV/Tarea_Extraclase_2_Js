class Persona {
  constructor(nombre, edad) {
      this.nombre = nombre;
      this.edad = edad;
  }
}

class Empleado extends Persona {
  constructor(nombre, edad, puesto, salario) {
      super(nombre, edad);
      this.puesto = puesto;
      this.salario = salario;
  }
}

let empleados = [];

const formulario = document.getElementById('formEmpleado');
const btnAgregar = document.getElementById('btnAgregar');
const btnActualizar = document.getElementById('btnActualizar');
const btnListar = document.getElementById('btnListar');
const nombreInput = document.getElementById('nombre');
const edadInput = document.getElementById('edad');
const puestoInput = document.getElementById('puesto');
const salarioInput = document.getElementById('salario');
const listadoEmpleados = document.getElementById('listado');
const mensajeError = document.getElementById('mensajeError');
const formActualizar = document.getElementById('formActualizar');
const nombreActualizarInput = document.getElementById('nombreActualizar');
const nuevoPuestoInput = document.getElementById('nuevoPuesto');
const mensajeErrorActualizar = document.getElementById('mensajeErrorActualizar');

function actualizarListado() {
  let tabla = document.getElementById('listado').querySelector('table');
  if (tabla) {
      tabla.innerHTML = '';
  } else {
      tabla = document.createElement('table');
  }
  let encabezados = ['Nombre', 'Edad', 'Puesto', 'Salario'];
  let filaEncabezados = document.createElement('tr');
  encabezados.forEach(encabezado => {
      let celda = document.createElement('th');
      celda.textContent = encabezado;
      filaEncabezados.appendChild(celda);
  });
  tabla.appendChild(filaEncabezados);
  empleados.forEach(empleado => {
      let fila = document.createElement('tr');
      let nombreCelda = document.createElement('td');
      nombreCelda.textContent = empleado.nombre;
      fila.appendChild(nombreCelda);

      let edadCelda = document.createElement('td');
      edadCelda.textContent = empleado.edad;
      fila.appendChild(edadCelda);

      let puestoCelda = document.createElement('td');
      puestoCelda.textContent = empleado.puesto;
      fila.appendChild(puestoCelda);

      let salarioCelda = document.createElement('td');
      salarioCelda.textContent = empleado.salario;
      fila.appendChild(salarioCelda);

      tabla.appendChild(fila);
  });
  listadoEmpleados.appendChild(tabla);
}

btnAgregar.addEventListener('click', () => {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('actualizarPuesto').style.display = 'none';
  document.getElementById('listado').style.display = 'none';
});

btnActualizar.addEventListener('click', () => {
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('actualizarPuesto').style.display = 'block';
  document.getElementById('listado').style.display = 'none';
});

btnListar.addEventListener('click', () => {
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('actualizarPuesto').style.display = 'none';
  document.getElementById('listado').style.display = 'block';
  actualizarListado();
});

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  let nombre = nombreInput.value;
  let edad = parseInt(edadInput.value);
  let puesto = parseInt(puestoInput.value);
  let salario = parseFloat(salarioInput.value);
  let agregado_con_exito = true;

  if (isNaN(edad) || isNaN(puesto) || isNaN(salario)) {
      agregado_con_exito = false;
  }

  else if (!/^[a-zA-Z]+$/.test(nombre)) {
      agregado_con_exito = false;
  }

  else if (edad <= 0 || puesto <= 0 || salario <= 0) {
      agregado_con_exito = false;
  }

  else if (empleados.some(empleado => empleado.puesto === puesto)) {
      agregado_con_exito = false;
  }

  const agregar = new Promise((resolve, reject) => {
    if (agregado_con_exito){
      let nuevoEmpleado = new Empleado(nombre, edad, puesto, salario);
      empleados.push(nuevoEmpleado);
      resolve("Empleado agregado correctamente");
    }
    else{
      reject("Datos incorrectos, no se agregará el empleado");
    }
  });

  agregar
    .then((mensaje) => {
      formulario.reset();
      alert(mensaje);
    })
    .catch((error) => {
      formulario.reset();
      alert(error);
    });
});

formActualizar.addEventListener('submit', (event) => {
  event.preventDefault();
  const actualizar = new Promise((resolve, reject) => {
    let nombreActualizar = nombreActualizarInput.value;
    let nuevoPuesto = parseInt(nuevoPuestoInput.value);
    let actualizado_con_exito = true;

    let empleadoEncontrado = empleados.find(empleado => empleado.nombre === nombreActualizar);
    if (empleadoEncontrado) {
        if (empleados.some(empleado => empleado.puesto === nuevoPuesto && empleado.nombre !== nombreActualizar)) {
            alert("El puesto ya está ocupado por otro empleado.");
            actualizado_con_exito = false;
        }
      }
        
      if(actualizado_con_exito){
        empleadoEncontrado.puesto = nuevoPuesto;
        resolve("Puesto actualizado correctamente");
      }
      else if (!empleadoEncontrado){
        reject("No se encontró el empleado.");
      }
    });
        actualizar
        .then((mensaje) => {
          nombreActualizarInput.value = '';
          nuevoPuestoInput.value = '';
          mensajeErrorActualizar.textContent = '';
          alert(mensaje);
        })
        .catch((error) => {
          alert(error);
        })
});