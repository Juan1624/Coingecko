// ====== SIMULADOR DE INVERSIÓN ======

// Genera la lista de criptomonedas
function GenerarLista(cryptos) {
  let listaHTML = "";
  for (let i = 0; i < cryptos.length; i++) {
    const c = cryptos[i];
    listaHTML += `
      <div class="c-lista-crypto" onclick="Simular('${c.id}', '${c.name}', ${c.current_price})">
          <img src="${c.image}" height="60" alt="${c.name}">
          <p>${c.name}</p>
          <p>$${c.current_price.toLocaleString()}</p>
      </div>`;
  }
  return listaHTML;
}

// Función principal de la pestaña
async function Curiosidades() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>💸 Simulador de inversión</h2><p>Selecciona una criptomoneda para ver cuánto ganarías o perderías en 7 días.</p>";

  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20");
  const data = await res.json();

  // Buscador
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar criptomoneda...";
  buscador.addEventListener("input", () => buscadorFuncion(buscador.value, data));

  // Lista inicial
  const contenedorLista = document.createElement("section");
  contenedorLista.classList.add("c-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = GenerarLista(data);

  // Agregar al DOM
  root.appendChild(buscador);
  root.appendChild(contenedorLista);
}

// Filtrado del buscador
function buscadorFuncion(texto, cryptos) {
  if (texto.length >= 2) {
    const filtrados = cryptos.filter(c => c.name.toLowerCase().includes(texto.toLowerCase()));
    document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
  } else {
    document.getElementById("la-lista").innerHTML = GenerarLista(cryptos);
  }
}

// Simulador
async function Simular(id, nombre, precioActual) {
  const root = document.getElementById("root");
  root.innerHTML = `<h2>📊 Simulación de inversión en ${nombre}</h2>`;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
  const data = await res.json();

  const precioPasado = data.prices[0][1];
  const cambio = ((precioActual - precioPasado) / precioPasado) * 100;

  root.innerHTML += `
    <div class="sim-card">
      <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" width="70">
      <h3>${nombre}</h3>
      <p>Precio hace 7 días: $${precioPasado.toFixed(2)}</p>
      <p>Precio actual: $${precioActual.toFixed(2)}</p>
      <p><b>Cambio:</b> ${cambio.toFixed(2)}%</p>
      <label>💵 Inversión (USD):</label>
      <input id="monto" type="number" placeholder="Ej: 100">
      <button onclick="CalcularGanancia(${precioPasado}, ${precioActual})">Calcular</button>
      <div id="resultado"></div>
      <button onclick="Curiosidades()">⬅️ Volver</button>
    </div>`;
}

// Calcula ganancia/pérdida
function CalcularGanancia(precioPasado, precioActual) {
  const monto = parseFloat(document.getElementById("monto").value);
  if (!monto || monto <= 0) return alert("Ingresa un monto válido");
  const cantidad = monto / precioPasado;
  const valorActual = cantidad * precioActual;
  const ganancia = valorActual - monto;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <p>Valor actual: $${valorActual.toFixed(2)}</p>
    <p style="color:${ganancia >= 0 ? 'limegreen' : 'tomato'}">
      ${ganancia >= 0 ? 'Ganancia' : 'Pérdida'}: $${ganancia.toFixed(2)}
    </p>`;
}
