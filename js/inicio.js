async function Inicio() {
    const root = document.getElementById("root");
    root.innerHTML = "<h2>💰 Criptomonedas principales</h2>";

    // Cargar categorías
    const catRes = await fetch("https://api.coingecko.com/api/v3/coins/categories");
    const categorias = await catRes.json();

    // Crear select de categorías
    let selectHTML = `<label for="filtroCategoria">Filtrar por categoría:</label>
                      <select id="filtroCategoria" onchange="filtrarCategoria()">
                      <option value="">-- Todas --</option>`;

    categorias.forEach(cat => {
        selectHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
    selectHTML += `</select>`;

    root.innerHTML += selectHTML;
    root.innerHTML += `<div id="listaCriptos"></div>`;

    // Cargar criptos iniciales
    cargarCriptos();
}

async function cargarCriptos(categoria = "") {
    const contenedor = document.getElementById("listaCriptos");
    contenedor.innerHTML = "Cargando criptos...";

    let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20";
    if (categoria) {
        url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${categoria}&per_page=20`;
    }

    const res = await fetch(url);
    const data = await res.json();

    contenedor.innerHTML = "";
    data.forEach(c => {
        contenedor.innerHTML += `
          <div class="card" onclick="Detalle('${c.id}')">
            <img src="${c.image}" height="60">
            <p>${c.name}</p>
            <p>$${c.current_price.toLocaleString()}</p>
          </div>`;
    });
}

function filtrarCategoria() {
    const select = document.getElementById("filtroCategoria");
    const categoria = select.value;
    cargarCriptos(categoria);
}
