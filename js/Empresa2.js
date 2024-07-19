/*Creado por los estudiantes Javier Molina Sánchez y Damian Jesus Groning Vallin
  Grupo 21 Números 6 y 4 respectivamente
*/
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

// Función para actualizar la lista de empleados en la tabla
function actualizarListado() {
  // Obtener la tabla dentro del contenedor listadoEmpleados
  let tabla = document.getElementById('listado').querySelector('table');

  // Si la tabla ya existe, la limpia
  if (tabla) {
    tabla.innerHTML = '';
  } else {
    // Si la tabla no existe, se crea una nueva
    tabla = document.createElement('table');
  }

  // Define los encabezados de las columnas de la tabla
  let encabezados = ['Nombre', 'Edad', 'Puesto', 'Salario'];

  // Crea una nueva fila para los encabezados
  let filaEncabezados = document.createElement('tr');

  // Recorre cada encabezado
  encabezados.forEach(encabezado => {
    // Crea una nueva celda de tabla (th) para cada encabezado
    let celda = document.createElement('th');
    // Asigna el texto del encabezado a la celda
    celda.textContent = encabezado;
    // Agrega la celda a la fila de encabezados
    filaEncabezados.appendChild(celda);
  });

  // Agrega la fila de encabezados a la tabla
  tabla.appendChild(filaEncabezados);

  // Recorre cada empleado en el array de empleados
  empleados.forEach(empleado => {
    // Crea una nueva fila para el empleado
    let fila = document.createElement('tr');
    // Crea una nueva celda para el nombre del empleado
    let nombreCelda = document.createElement('td');
    // Asigna el nombre del empleado a la celda
    nombreCelda.textContent = empleado.nombre;
    // Agrega la celda del nombre a la fila
    fila.appendChild(nombreCelda);
    // Crea una nueva celda para la edad del empleado
    let edadCelda = document.createElement('td');
    // Asigna la edad del empleado a la celda
    edadCelda.textContent = empleado.edad;
    // Agrega la celda de la edad a la fila
    fila.appendChild(edadCelda);
    // Crea una nueva celda para el puesto del empleado
    let puestoCelda = document.createElement('td');
    // Asigna el puesto del empleado a la celda
    puestoCelda.textContent = empleado.puesto;
    // Agrega la celda del puesto a la fila
    fila.appendChild(puestoCelda);
    // Crea una nueva celda para el salario del empleado
    let salarioCelda = document.createElement('td');
    // Asigna el salario del empleado a la celda
    salarioCelda.textContent = empleado.salario;
    // Agrega la celda del salario a la fila
    fila.appendChild(salarioCelda);
    // Agrega la fila del empleado a la tabla
    tabla.appendChild(fila);
  });

  // Agrega la tabla al contenedor listadoEmpleados
  listadoEmpleados.appendChild(tabla);
}

// Agrega un evento de clic al botón btnAgregar
btnAgregar.addEventListener('click', () => {
  // Muestra el formulario para agregar empleados
  document.getElementById('formulario').style.display = 'block';
  // Oculta el formulario para actualizar empleados
  document.getElementById('actualizarPuesto').style.display = 'none';
  // Oculta la lista de empleados
  document.getElementById('listado').style.display = 'none';
});

// Agrega un evento de clic al botón btnActualizar
btnActualizar.addEventListener('click', () => {
  // Oculta el formulario para agregar empleados
  document.getElementById('formulario').style.display = 'none';
  // Muestra el formulario para actualizar empleados
  document.getElementById('actualizarPuesto').style.display = 'block';
  // Oculta la lista de empleados
  document.getElementById('listado').style.display = 'none';
});

// Agrega un evento de clic al botón btnListar
btnListar.addEventListener('click', () => {
  // Oculta el formulario para agregar empleados
  document.getElementById('formulario').style.display = 'none';
  // Oculta el formulario para actualizar empleados
  document.getElementById('actualizarPuesto').style.display = 'none';
  // Muestra la lista de empleados
  document.getElementById('listado').style.display = 'block';
  // Actualiza la lista de empleados en la tabla
  actualizarListado();
});

// Agrega un evento de envío al formulario para agregar empleados
formulario.addEventListener('submit', (event) => {
  // Previene el envío predeterminado del formulario
  event.preventDefault();

  // Obtiene los valores de los campos de entrada
  let nombre = nombreInput.value;
  let edad = parseInt(edadInput.value);
  let puesto = parseInt(puestoInput.value);
  let salario = parseFloat(salarioInput.value);

  // Crea una nueva promesa para manejar la operación de agregar empleados
  const agregar = new Promise((resolve, reject) => {
    // Valida los datos ingresados
    if (isNaN(edad) || isNaN(puesto) || isNaN(salario)) {
      // Si alguno de los datos no es un número, rechaza la promesa con un mensaje de error
      reject('Por favor, ingrese datos válidos.');
    } else if (!/^[a-zA-Z]+$/.test(nombre)) {
      // Si el nombre no contiene solo letras, rechaza la promesa con un mensaje de error
      reject('El nombre solo puede contener letras.');
    } else if (edad <= 0 || puesto <= 0 || salario <= 0) {
      // Si la edad, el puesto o el salario son menores o iguales a 0, rechaza la promesa con un mensaje de error
      reject('La edad, el puesto y el salario deben ser mayores que 0.');
    } else if (empleados.some(empleado => empleado.puesto === puesto)) {
      // Si el puesto ya está ocupado por otro empleado, rechaza la promesa con un mensaje de error
      reject('El puesto ya está ocupado por otro empleado.');
    } else {
      // Si las validaciones pasan, crea un nuevo empleado
      let nuevoEmpleado = new Empleado(nombre, edad, puesto, salario);
      // Agrega el nuevo empleado al array de empleados
      empleados.push(nuevoEmpleado);
      // Resuelve la promesa con un mensaje de éxito
      resolve('Empleado agregado correctamente');
    }
  });

  // Maneja la respuesta de la promesa
  agregar.then((mensaje) => {
    // Restablece los campos del formulario
    formulario.reset();
    // Limpia el mensaje de error
    mensajeError.textContent = '';
    // Muestra un mensaje de éxito
    alert(mensaje);
  }).catch((error) => {
    // Si la promesa se rechaza, muestra el mensaje de error en el elemento mensajeError
    mensajeError.textContent = error;
  });
});

// Agrega un evento de envío al formulario para actualizar el puesto de un empleado
formActualizar.addEventListener('submit', (event) => {
  // Previene el envío predeterminado del formulario
  event.preventDefault();

  // Obtiene los valores de los campos de entrada
  let nombreActualizar = nombreActualizarInput.value;
  let nuevoPuesto = parseInt(nuevoPuestoInput.value);

  // Encuentra el empleado que se va a actualizar
  let empleadoEncontrado = empleados.find(empleado => empleado.nombre === nombreActualizar);

  // Si el empleado se encuentra
  if (empleadoEncontrado) {
    // Verifica si el nuevo puesto ya está ocupado por otro empleado
    if (empleados.some(empleado => empleado.puesto === nuevoPuesto && empleado.nombre !== nombreActualizar)) {
      // Si el puesto está ocupado, muestra un mensaje de error y termina la ejecución
      alert("El puesto ya está ocupado por otro empleado.");
      return;
    }
    // Actualiza el puesto del empleado
    empleadoEncontrado.puesto = nuevoPuesto;
    // Limpia los campos del formulario
    nombreActualizarInput.value = '';
    nuevoPuestoInput.value = '';
    // Limpia el mensaje de error
    mensajeErrorActualizar.textContent = '';
    // Muestra un mensaje de éxito
    alert("Puesto actualizado correctamente");
  } else {
    // Si el empleado no se encuentra, muestra un mensaje de error
    mensajeErrorActualizar.textContent = 'No se encontró el empleado.';
  }
});