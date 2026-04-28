'use strict';

/* =========================
   SERVICIO DE STORAGE
========================= */

const TareaStorage = {
  CLAVE: 'tareas_lista',

  getAll() {
    try {
      const datos = localStorage.getItem(this.CLAVE);
      if (!datos) {
        return [];
      }
      return JSON.parse(datos);
    } catch (error) {
      console.error('Error al leer tareas:', error);
      return [];
    }
  },

  guardar(tareas) {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  },

  /**
   * TODO 4.2.1: Crear una nueva tarea
   */
  crear(texto) {
    // TODO 4.2.1.1
    const tareas = this.getAll();

    // TODO 4.2.1.2
    const nueva = {
      id: Date.now(),
      texto: texto.trim(),
      completada: false
    };

    // TODO 4.2.1.3
    tareas.push(nueva);

    // TODO 4.2.1.4
    this.guardar(tareas);

    // TODO 4.2.1.5
    return nueva;
  },

  /**
   * TODO 4.2.2: Alternar estado completada/pendiente
   */
  toggleCompletada(id) {
    // TODO 4.2.2.1
    const tareas = this.getAll();

    // TODO 4.2.2.2
    const tarea = tareas.find(t => t.id === id);

    // TODO 4.2.2.3
    if (tarea) {
      tarea.completada = !tarea.completada;
    }

    // TODO 4.2.2.4
    this.guardar(tareas);
  },

  /**
   * TODO 4.2.3: Eliminar una tarea
   */
  eliminar(id) {
    // TODO 4.2.3.1
    const tareas = this.getAll();

    // TODO 4.2.3.2
    const filtradas = tareas.filter(t => t.id !== id);

    // TODO 4.2.3.3
    this.guardar(filtradas);
  },

  /**
   * TODO 4.2.4: Eliminar todas las tareas
   */
  limpiarTodo() {
    // TODO 4.2.4.1
    localStorage.removeItem(this.CLAVE);
  }
};

  /* =========================
   SERVICIO DE TEMA
========================= */

const TemaStorage = {
  CLAVE: 'tema_app',

  getTema() {
    return localStorage.getItem(this.CLAVE) || 'claro';
  },

  setTema(tema) {
    localStorage.setItem(this.CLAVE, tema);
  }
};