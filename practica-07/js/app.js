'use strict';

/* =========================
   SELECCIÓN DE ELEMENTOS DOM
========================= */

const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('input-tarea');
const listaTareas = document.getElementById('lista-tareas');
const mensajeEstado = document.getElementById('mensaje-estado');
const btnLimpiar = document.getElementById('btn-limpiar');
const themeBtns = document.querySelectorAll('[data-theme]');

/* =========================
   ESTADO GLOBAL
========================= */

let tareas = []; // Array de tareas en memoria

/**
 * TODO 5.2.1: Crear elemento de tarea con createElement
 * @param {Object} tarea - { id, texto, completada }
 * @returns {HTMLElement} Elemento <li>
 */
function crearElementoTarea(tarea) {
  // Crear <li>
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = tarea.id;
  
  if (tarea.completada) {
    li.classList.add('task-item--completed');
  }
  
  // TODO 5.2.1.1: Crear checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  checkbox.checked = tarea.completada;
  
  // TODO 5.2.1.2: Crear span de texto
  const span = document.createElement('span');
  span.className = 'task-item__text';
  span.textContent = tarea.texto;
  
  // TODO 5.2.1.3: Crear botón eliminar
  const btnEliminar = document.createElement('button');
  btnEliminar.className = 'btn btn--danger btn--small';
  btnEliminar.textContent = '🗑️';
  
  // TODO 5.2.1.4: Crear contenedor de acciones
  const divAcciones = document.createElement('div');
  divAcciones.className = 'task-item__actions';
  divAcciones.appendChild(btnEliminar);
  
  // TODO 5.2.1.5: Ensamblar todo
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(divAcciones);
  
  // TODO 5.2.1.6: Event listeners
  checkbox.addEventListener('change', () => toggleTarea(tarea.id));
  btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
  
  return li;
}

/**
 * TODO 5.3.1: Renderizar todas las tareas
 */
function renderizarTareas() {
  // TODO 5.3.1.1
  listaTareas.innerHTML = '';
  
  // TODO 5.3.1.2
  if (tareas.length === 0) {
    const divVacio = document.createElement('div');
    divVacio.className = 'empty-state';

    const p = document.createElement('p');
    p.textContent = '🎉 No hay tareas. ¡Agrega una para comenzar!';

    divVacio.appendChild(p);
    listaTareas.appendChild(divVacio);
    return;
  }
  
  // TODO 5.3.1.3
  tareas.forEach(tarea => {
    const elemento = crearElementoTarea(tarea);
    listaTareas.appendChild(elemento);
  });
}

/**
 * Mostrar mensaje temporal
 * @param {string} texto - Texto del mensaje
 * @param {string} tipo - 'success' o 'error'
 */
function mostrarMensaje(texto, tipo = 'success') {
  mensajeEstado.textContent = texto;
  mensajeEstado.className = `mensaje mensaje--${tipo}`;
  mensajeEstado.classList.remove('oculto');
  
  setTimeout(() => {
    mensajeEstado.classList.add('oculto');
  }, 3000);
}

/**
 * Cargar tareas desde localStorage
 */
function cargarTareas() {
  tareas = TareaStorage.getAll();
  renderizarTareas();
}

/**
 * TODO 6.2.1: Agregar nueva tarea
 * @param {string} texto - Texto de la tarea
 */
function agregarTarea(texto) {
  // TODO 6.2.1.1
  if (!texto.trim()) {
    mostrarMensaje('El texto no puede estar vacío', 'error');
    return;
  }
  
  // TODO 6.2.1.2
  const nueva = TareaStorage.crear(texto);
  
  // TODO 6.2.1.3
  tareas = TareaStorage.getAll();
  
  // TODO 6.2.1.4
  renderizarTareas();
  
  // TODO 6.2.1.5
  mostrarMensaje(`✓ Tarea "${nueva.texto}" agregada`);
}

/**
 * TODO 6.3.1: Alternar completada/pendiente
 */
function toggleTarea(id) {
  // TODO 6.3.1.1
  TareaStorage.toggleCompletada(id);
  
  // TODO 6.3.1.2
  tareas = TareaStorage.getAll();
  
  // TODO 6.3.1.3
  renderizarTareas();
}

/**
 * TODO 6.3.2: Eliminar tarea
 */
function eliminarTarea(id) {
  // TODO 6.3.2.1
  const tarea = tareas.find(t => t.id === id);
  
  // TODO 6.3.2.2
  if (!tarea || !confirm(`¿Eliminar "${tarea.texto}"?`)) return;
  
  // TODO 6.3.2.3
  TareaStorage.eliminar(id);
  
  // TODO 6.3.2.4
  tareas = TareaStorage.getAll();
  renderizarTareas();
  
  // TODO 6.3.2.5
  mostrarMensaje(`🗑️ Tarea eliminada`);
}

/**
 * TODO 6.3.3: Limpiar todo
 */
function limpiarTodo() {
  // TODO 6.3.3.1
  if (tareas.length === 0) {
    mostrarMensaje('No hay tareas para eliminar', 'error');
    return;
  }
  
  // TODO 6.3.3.2
  if (!confirm('¿Eliminar TODAS las tareas?')) return;
  
  // TODO 6.3.3.3
  TareaStorage.limpiarTodo();
  
  // TODO 6.3.3.4
  tareas = [];
  renderizarTareas();
  
  mostrarMensaje('🗑️ Todas las tareas eliminadas');
}

/**
 * TODO 7.1.1: Aplicar tema
 * @param {string} nombreTema - 'claro' o 'oscuro'
 */
function aplicarTema(nombreTema) {
  // TODO 7.1.1.1
  if (nombreTema === 'oscuro') {
    document.documentElement.style.setProperty('--bg-primary', '#1a1a2e');
    document.documentElement.style.setProperty('--card-bg', '#16213e');
    document.documentElement.style.setProperty('--text-primary', '#ffffff');
    document.documentElement.style.setProperty('--text-secondary', '#cccccc');
  } else {
    // Tema claro (restaurar valores)
    document.documentElement.style.setProperty('--bg-primary', '#f5f7fa');
    document.documentElement.style.setProperty('--card-bg', '#ffffff');
    document.documentElement.style.setProperty('--text-primary', '#2c3e50');
    document.documentElement.style.setProperty('--text-secondary', '#555555');
  }
  
  // TODO 7.1.1.2
  themeBtns.forEach(btn => {
    btn.classList.toggle(
      'theme-btn--active',
      btn.dataset.theme === nombreTema
    );
  });
  
  // TODO 7.1.1.3
  TemaStorage.setTema(nombreTema);
}

/* =========================
   EVENTOS
========================= */

// Evento: Submit del formulario
formTarea.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputTarea.value.trim();
  agregarTarea(texto);
  inputTarea.value = '';
});

// Evento: Limpiar todo
btnLimpiar.addEventListener('click', limpiarTodo);

// Evento: Cambiar tema
themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    aplicarTema(btn.dataset.theme);
  });
});

/* =========================
   INICIALIZACIÓN
========================= */

// Cargar tema guardado
const temaGuardado = TemaStorage.getTema();
aplicarTema(temaGuardado);

// Cargar tareas desde localStorage
cargarTareas();

// Mensaje de bienvenida
if (tareas.length === 0) {
  mostrarMensaje('👋 Bienvenido! Agrega tu primera tarea', 'success');
}