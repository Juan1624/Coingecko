async function Inicio() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>💰 Criptomonedas principales</h2>

    <!-- 🔍 Buscador integrado -->
    <div class="buscar-container">
      <input 
        id="buscarInput" 
        type="text" 
        placeholder="Buscar criptomoneda (ej: bitcoin)" 
        onkeyup="buscarCripto()">
    </div>

    <div class="filtro-container">
      <label for="filtroCategoria">Filtrar por categoría:</label>
      <select id="filtroCategoria" onchange="filtrarCategoria()">
        <option value="">-- Todas --</option>
      </select>
    </div>

    <div id="listaCriptos" class="grid-criptos"></div>
  `;

  // Cargar categorías
  const catRes = await fetch("https://api.coingecko.com/api/v3/coins/categories");
  const categorias = await catRes.json();

  const select = document.getElementById("filtroCategoria");
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });

  cargarCriptos();
}

async function cargarCriptos(categoria = "") {
  const contenedor = document.getElementById("listaCriptos");
  contenedor.innerHTML = "<p>Cargando criptos...</p>";

  let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20`;
  if (categoria) url += `&category=${categoria}`;

  const res = await fetch(url);
  const data = await res.json();

  contenedor.innerHTML = "";
  data.forEach(c => {
    contenedor.innerHTML += `
      <div class="card" onclick="Detalle('${c.id}')">
        <img src="${c.image}" height="90">
        <p class="nombre">${c.name}</p>
        <p class="precio">$${c.current_price.toLocaleString()}</p>
      </div>
    `;
  });
}

async function buscarCripto() {
  const texto = document.getElementById("buscarInput").value.toLowerCase();
  const contenedor = document.getElementById("listaCriptos");
  contenedor.innerHTML = "";

  if (texto.length < 2) {
    cargarCriptos(); 
    return;
  }

  const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${texto}`);
  const data = await res.json();

  if (data.coins.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  data.coins.forEach(c => {
    contenedor.innerHTML += `
      <div class="card" onclick="Detalle('${c.id}')">
        <img src="${c.thumb}" height="60">
        <p>${c.name}</p>
      </div>
    `;
  });
}

function filtrarCategoria() {
  const categoria = document.getElementById("filtroCategoria").value;
  cargarCriptos(categoria);
}
