'use strict';

const form = document.getElementById('form-registro');
const inputs = form.querySelectorAll('input, select');
const mensaje = document.getElementById('mensaje');
const btnSubmit = form.querySelector('button[type="submit"]');

btnSubmit.disabled = true;

/* =========================
   PASSWORD
========================= */

function evaluarPassword(password) {
  let fuerza = 0;

  if (password.length >= 8) fuerza++;
  if (/[A-Z]/.test(password)) fuerza++;
  if (/[a-z]/.test(password)) fuerza++;
  if (/\d/.test(password)) fuerza++;

  return fuerza;
}

function mostrarFuerzaPassword(input) {
  let indicador = input.parentElement.querySelector('.password-strength');

  if (!indicador) {
    indicador = document.createElement('div');
    indicador.className = 'password-strength';
    input.parentElement.appendChild(indicador);
  }

  const fuerza = evaluarPassword(input.value);

  if (!input.value) {
    indicador.textContent = '';
    return;
  }

  if (fuerza <= 2) {
    indicador.textContent = 'Débil';
    indicador.style.color = 'red';
  } else if (fuerza === 3) {
    indicador.textContent = 'Media';
    indicador.style.color = 'orange';
  } else {
    indicador.textContent = 'Fuerte';
    indicador.style.color = 'green';
  }
}

/* =========================
   EVENTOS INPUT
========================= */

// Validar al salir
inputs.forEach(input => {
  input.addEventListener('focusout', () => {
    const valido = validarCampo(input);

    input.classList.remove('input-error', 'input-success');
    input.classList.add(valido ? 'input-success' : 'input-error');
  });
});

// Mientras escribe
inputs.forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('input-error', 'input-success');

    const small = input.parentElement.querySelector('.error');
    if (small) small.textContent = '';

    if (input.id === 'password') {
      mostrarFuerzaPassword(input);
    }

    verificarFormularioValido();
  });
});

/* =========================
   SUBMIT (CORREGIDO)
========================= */

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const esValido = validarFormulario(form);

  if (!esValido) {
    mensaje.textContent = '❌ Corrige los errores del formulario';
    mensaje.style.color = 'red';
    return;
  }

  // Obtener datos
  const formData = new FormData(form);
  const datos = Object.fromEntries(formData.entries());
  datos.terminos = document.getElementById('terminos').checked;

  console.log('Datos guardados:', datos);
  const contenedor = document.getElementById('resultado');
  contenedor.innerHTML = ''; // limpiar anterior

  const tarjeta = crearTarjetaUsuario(datos);
  contenedor.appendChild(tarjeta);

  // GUARDAR EN LOCALSTORAGE (nuevo)
  localStorage.setItem('usuario', JSON.stringify(datos));

  // Mostrar éxito
  mensaje.textContent = '✅ Registro exitoso';
  mensaje.style.color = 'green';

  // RESET REAL
  form.reset();

  // Limpiar estilos
  inputs.forEach(input => {
    input.classList.remove('input-success', 'input-error');
  });

  form.querySelectorAll('.error').forEach(el => el.textContent = '');

  // limpiar fuerza password
  const indicador = document.querySelector('.password-strength');
  if (indicador) indicador.textContent = '';

  // deshabilitar botón otra vez
  btnSubmit.disabled = true;
});

/* =========================
   TELÉFONO
========================= */

function formatearTelefono(valor) {
  valor = valor.replace(/\D/g, '').substring(0, 10);

  if (valor.length > 6) {
    return `${valor.slice(0,3)} ${valor.slice(3,6)} ${valor.slice(6)}`;
  } else if (valor.length > 3) {
    return `${valor.slice(0,3)} ${valor.slice(3)}`;
  }
  return valor;
}

document.getElementById('telefono').addEventListener('input', (e) => {
  e.target.value = formatearTelefono(e.target.value);
});

/* =========================
   VALIDAR FORMULARIO
========================= */

function verificarFormularioValido() {
  let valido = true;

  const inputs = form.querySelectorAll('input, select');

  inputs.forEach(input => {
    const valor = input.value.trim();

    switch (input.id) {
      case 'nombre':
        if (!valor || valor.length < 3) valido = false;
        break;

      case 'email':
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(valor)) valido = false;
        break;

      case 'telefono':
        const limpio = valor.replace(/\D/g, '');
        if (limpio.length !== 10) valido = false;
        break;

      case 'fecha':
        if (!valor) valido = false;
        break;

      case 'genero':
        if (!valor) valido = false;
        break;

      case 'password':
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!regexPass.test(valor)) valido = false;
        break;

      case 'confirmar':
        const password = document.getElementById('password').value;
        if (valor !== password) valido = false;
        break;

      case 'terminos':
        if (!input.checked) valido = false;
        break;
    }
  });

  btnSubmit.disabled = !valido;
}


function crearTarjetaUsuario(datos) {
  const card = document.createElement('div');
  card.className = 'card-usuario';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Datos Registrados';

  const nombre = document.createElement('p');
  nombre.textContent = `Nombre: ${datos.nombre}`;

  const email = document.createElement('p');
  email.textContent = `Email: ${datos.email}`;

  const telefono = document.createElement('p');
  telefono.textContent = `Teléfono: ${datos.telefono}`;

  const fecha = document.createElement('p');
  fecha.textContent = `Fecha de nacimiento: ${formatearFecha(datos.fecha)}`;

  const genero = document.createElement('p'); 
  genero.textContent = `Género: ${capitalizar(datos.genero)}`;

  // armar tarjeta
  card.appendChild(titulo);
  card.appendChild(nombre);
  card.appendChild(email);
  card.appendChild(telefono);
  card.appendChild(fecha);
  card.appendChild(genero);

  return card;
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);

  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function capitalizar(texto) {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}