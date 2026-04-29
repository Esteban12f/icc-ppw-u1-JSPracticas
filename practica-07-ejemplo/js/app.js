'use strict';

// clave con la cual se guardara en localStorage
const STORAGE_KEY = 'tareas';

// de elementos del DOM
const input = document.querySelector('#input-tarea');
const btnAdd = document.querySelector('#btn-agregar');
const listado = document.querySelector('#lista-tareas');
const btnClear = document.querySelector('#btn-limpiar');

// memoria del listado
let tareas = [];

// funciones de storage
function loadStorage() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

function saveTareas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

// funciones de logica
function agregarTarea(texto) {
    if(!texto.trim()) return;

    const nuevaTarea = {
        id: Date.now(),
        texto: texto.trim(),
        completada: false
    };
    tareas.push(nuevaTarea);
    saveTareas();
    renderizar();
    input.value = '';
    input.focus();
}

function eliminarTarea(id) {
    // const tarea = tareas.find(t => t.id === id);
    // if(tarea) {
    //    tareas.remove(tarea);
    // }
    tareas = tareas.filter(t => t.id !== id);
    saveTareas();
    renderizar();
}

function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if(tarea) {
        tarea.completada = !tarea.completada;
    }
    saveTareas();
    renderizar();
}


function clearAll() {
    if(!tareas.length === 0) return;

    if(confirm('Estás seguro??')) {
        tareas = [];
        saveTareas();
        renderizar();
    }
}

function renderizar() {
  
  listado.innerHTML = '';

  
  if (tareas.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'vacio';
    vacio.textContent = 'No hay tareas. ¡Agrega una!';
    listado.appendChild(vacio);
    btnClear.disabled = true;
    return;
  }

  btnClear.disabled = false;

  
  tareas.forEach(tarea => {
    const item = document.createElement('div');
    item.className = 'item-tarea';
    if (tarea.completada) {
      item.classList.add('completada');
    }

    
    const texto = document.createElement('span');
    texto.className = 'texto-tarea';
    texto.textContent = tarea.texto;
    texto.addEventListener('click', () => toggleTarea(tarea.id));

    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    item.appendChild(texto);
    item.appendChild(btnEliminar);
    listado.appendChild(item);
  });
}


btnAdd.addEventListener('click', () => {
  agregarTarea(input.value);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    agregarTarea(input.value);
  }
});

btnClear.addEventListener('click', clearAll);


// Cargar tareas guardadas al abrir la página
tareas = loadStorage();
renderizar();
input.focus();