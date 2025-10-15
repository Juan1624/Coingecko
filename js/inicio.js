async function Inicio() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <h2>💰 Criptomonedas principales</h2>
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

    // Cargar criptos iniciales
    cargarCriptos();
}

async function cargarCriptos(categoria = "") {
    const contenedor = document.getElementById("listaCriptos");
    contenedor.innerHTML = "<p>Cargando criptos...</p>";

    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20`;
    if (categoria) {
        url += `&category=${categoria}`;
    }

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

function filtrarCategoria() {
    const select = document.getElementById("filtroCategoria");
    const categoria = select.value;
    cargarCriptos(categoria);
}
