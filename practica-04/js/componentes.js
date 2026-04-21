'use strict';

function VideojuegoCard(videojuego) {

  const iconoFavorito = videojuego.favorito ? '★' : '☆';

  return `
    <article class="card" data-id="${videojuego.id}" data-genero="${videojuego.genero}">
      <img src="${videojuego.poster}" alt="${videojuego.titulo}" class="card__img">

      <div class="card__body">
        <h3 class="card__titulo">${videojuego.titulo}</h3>
        <p class="card__director">${videojuego.desarrollador}</p>

        <div class="card__info">
          <span class="badge">${videojuego.genero}</span>
          <span class="rating">⭐ ${videojuego.rating}</span>
          <span class="year">${videojuego.year}</span>
        </div>

        <div class="card__actions">
          <button data-action="favorito" data-id="${videojuego.id}">
            ${iconoFavorito} Favorito
          </button>

          <button data-action="eliminar" data-id="${videojuego.id}">
            Eliminar
          </button>
        </div>

      </div>
    </article>
  `;
}

function FilterBar(generos, activo) {

  return `
    <div class="filter-bar">

      <button 
        class="filtro-btn ${activo === 'todos' ? 'filtro-btn--activo' : ''}" 
        data-filtro="todos">
        Todos
      </button>

      ${generos.map(genero => `
        <button 
          class="filtro-btn ${activo === genero ? 'filtro-btn--activo' : ''}" 
          data-filtro="${genero}">
          ${genero}
        </button>
      `).join('')}

    </div>
  `;

}

function SearchBar() {

  return `
    <div class="search-bar">

      <input 
        type="text" 
        id="busqueda" 
        placeholder="Buscar videojuego..."
        value="${busqueda}"
      >

      <button data-action="limpiar-busqueda">
        Limpiar
      </button>

    </div>
  `;

}

function ContadorResultados(total, filtrados) {

  return `
    <p class="contador">
      Mostrando ${filtrados} de ${total} videojuegos
    </p>
  `;

}