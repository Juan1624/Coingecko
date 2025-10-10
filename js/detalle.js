var esFavorito = false;

function toggleFavorito(paramid, paramname) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = favoritos.some(c => c.name === paramname);

    if (existe) {
        favoritos = favoritos.filter(c => c.name !== paramname);
        esFavorito = false;
    } else {
        favoritos.push({
            id: paramid,
            name: paramname,
            url: `https://api.coingecko.com/api/v3/coins/${paramid}`
        });
        esFavorito = true;
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

async function Detalle(parametro) {
    const root = document.getElementById("root");
    root.innerHTML = "";

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${parametro}`);
    const data = await res.json();

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(c => c.name === data.name);

    const detalle = `
      <section class="c-detalle">
        <img src="${data.image.large}" alt="${data.name}" height="100">
        <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
        <p>💲 Precio actual: ${data.market_data.current_price.usd} USD</p>
        <p>📈 Cambio 24h: ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        <p>🏦 Capitalización: $${data.market_data.market_cap.usd.toLocaleString()}</p>
        <p>🔢 Ranking: ${data.market_cap_rank}</p>
        <p>📅 Fecha de inicio: ${data.genesis_date || "Desconocida"}</p>
        <button onClick="toggleFavorito('${data.id}', '${data.name}')">
          <span id="corazon-${data.id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
      </section>
    `;

    root.innerHTML = detalle;
}
