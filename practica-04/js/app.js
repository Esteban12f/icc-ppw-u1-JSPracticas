'use strict';

let filtroActivo = 'todos';
let busqueda = '';

function render() {

  const generos = [...new Set(videojuegos.map(v => v.genero))];

  let datosFiltrados = videojuegos;

  if (filtroActivo !== 'todos') {
    datosFiltrados = datosFiltrados.filter(
      v => v.genero === filtroActivo
    );
  }

  if (busqueda !== '') {

    datosFiltrados = datosFiltrados.filter(v =>
      v.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

  }

  document.querySelector('#app').innerHTML = `

    <h1>Catálogo de Videojuegos</h1>

    ${SearchBar()}

    ${FilterBar(generos, filtroActivo)}

    ${ContadorResultados(videojuegos.length, datosFiltrados.length)}

    <div class="grid">
      ${datosFiltrados.map(v => VideojuegoCard(v)).join('')}
    </div>

  `;

    const input = document.querySelector('#busqueda');

    if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    }

}

document.querySelector('#app').addEventListener('click', (e) => {

  if (e.target.matches('[data-filtro]')) {

    filtroActivo = e.target.dataset.filtro;

    render();

  }

  if (e.target.matches('[data-action="favorito"]')) {

    const id = Number(e.target.dataset.id);

    const juego = videojuegos.find(v => v.id === id);

    if (juego) {

      juego.favorito = !juego.favorito;

      render();

    }

  }

  if (e.target.matches('[data-action="eliminar"]')) {

    const id = Number(e.target.dataset.id);

    const index = videojuegos.findIndex(v => v.id === id);

    if (index !== -1) {

      videojuegos.splice(index, 1);

      render();

    }

  }

  if (e.target.matches('[data-action="limpiar-busqueda"]')) {
    busqueda = '';

    render();
  }

});

document.querySelector('#app').addEventListener('input', (e) => {

  if (e.target.id === 'busqueda') {

    busqueda = e.target.value;

    render();

  }

});

render();