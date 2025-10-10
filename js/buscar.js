async function Buscar() {
    const root = document.getElementById("root");
    root.innerHTML = `
      <h2>🔍 Buscar Criptomoneda</h2>
      <input id="buscarInput" placeholder="Ej: bitcoin" onkeyup="buscarCripto()">
      <div id="resultado"></div>
    `;
}

async function buscarCripto() {
    const texto = document.getElementById("buscarInput").value.toLowerCase();
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";

    if (texto.length < 2) return;

    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${texto}`);
    const data = await res.json();

    data.coins.forEach(c => {
        contenedor.innerHTML += `
          <div class="card" onClick="Detalle('${c.id}')">
            <img src="${c.thumb}" height="40">
            <p>${c.name}</p>
          </div>`;
    });
}
