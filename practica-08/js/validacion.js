'use strict';

/* =========================
   UTILIDADES
========================= */

// Mostrar error en el campo
function mostrarError(input, mensaje) {
  const small = input.parentElement.querySelector('.error');
  small.textContent = mensaje;
  input.classList.add('input-error');
}

// Limpiar error
function limpiarError(input) {
  const small = input.parentElement.querySelector('.error');
  small.textContent = '';
  input.classList.remove('input-error');
}

/* =========================
   VALIDACIONES INDIVIDUALES
========================= */

/**
 * Validar un campo individual
 */
function validarCampo(input) {
  const valor = input.value.trim();
  const id = input.id;

  limpiarError(input);

  switch (id) {

    // NOMBRE
    case 'nombre':
      if (!valor) {
        mostrarError(input, 'El nombre es obligatorio');
        return false;
      }
      if (valor.length < 3) {
        mostrarError(input, 'Debe tener al menos 3 caracteres');
        return false;
      }
      return true;

    // EMAIL (regex)
    case 'email':
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!valor) {
        mostrarError(input, 'El email es obligatorio');
        return false;
      }
      if (!regexEmail.test(valor)) {
        mostrarError(input, 'Formato de email inválido');
        return false;
      }
      return true;

    // TELÉFONO (regex)
    case 'telefono':
      const regexTelefono = /^\d{10}$/;
      const limpio = valor.replace(/\D/g, '');

      if (!regexTelefono.test(limpio)) {
        mostrarError(input, 'Debe tener 10 dígitos');
        return false;
      }
      return true;

    // FECHA (mayor de edad)
    case 'fecha':
      if (!valor) {
        mostrarError(input, 'La fecha es obligatoria');
        return false;
      }

      const hoy = new Date();
      const nacimiento = new Date(valor);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();

      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }

      if (edad < 18) {
        mostrarError(input, 'Debes ser mayor de edad');
        return false;
      }
      return true;

    // GÉNERO
    case 'genero':
      if (!valor) {
        mostrarError(input, 'Selecciona una opción');
        return false;
      }
      return true;

    // PASSWORD
    case 'password':
      const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!regexPass.test(valor)) {
        mostrarError(
          input,
          'Mínimo 8 caracteres, mayúscula, minúscula y número'
        );
        return false;
      }
      return true;

    // CONFIRMAR PASSWORD
    case 'confirmar':
      const password = document.getElementById('password').value;
      if (valor !== password) {
        mostrarError(input, 'Las contraseñas no coinciden');
        return false;
      }
      return true;

    // 🔹 TÉRMINOS
    case 'terminos':
      if (!input.checked) {
        mostrarError(input, 'Debes aceptar los términos');
        return false;
      }
      return true;
  }

  return true;
}

/* =========================
   VALIDAR TODO EL FORMULARIO
========================= */

function validarFormulario(form) {
  let valido = true;

  const inputs = form.querySelectorAll('input, select');

  inputs.forEach(input => {
    const esValido = validarCampo(input);
    if (!esValido) {
      valido = false;
    }
  });

  return valido;
}

function mostrarError(input, mensaje) {
  const small = input.parentElement.querySelector('.error');
  if (small) small.textContent = mensaje;
  input.classList.add('input-error');
}

function limpiarError(input) {
  const small = input.parentElement.querySelector('.error');
  if (small) small.textContent = '';
  input.classList.remove('input-error');
}