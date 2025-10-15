function Info() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>📘 Glosario Cripto</h2>
    <div class="descripcion-info">Términos esenciales del mundo cripto para principiantes.</div>
    <div class="glosario-grid" id="glosario"></div>
  `;

  const conceptos = {
    "Blockchain": "Red descentralizada donde se registran transacciones digitales; base de las criptomonedas.",
    "Token": "Unidad digital dentro de una blockchain que representa valor, acceso o utilidad.",
    "NFT": "Activo digital único que certifica propiedad sobre un ítem o arte.",
    "DeFi": "Servicios financieros sin intermediarios, basados en contratos inteligentes.",
    "Stablecoin": "Criptomoneda cuyo valor está vinculada a un activo estable como el dólar.",
    "Gas Fee": "Tarifa pagada a la red para procesar transacciones.",
    "Wallet": "Aplicación o dispositivo donde se guardan criptomonedas.",
    "Mining": "Proceso que valida transacciones y crea nuevas monedas.",
    "Halving": "Evento de Bitcoin que reduce a la mitad la recompensa de los mineros.",
    "Smart Contract": "Programa que se ejecuta automáticamente al cumplirse condiciones definidas.",
  };

  const contenedor = document.getElementById("glosario");

  for (const [term, def] of Object.entries(conceptos)) {
    const card = document.createElement("div");
    card.className = "tarjeta-info";
    card.innerHTML = `<h3>${term}</h3><p>${def}</p>`;
    contenedor.appendChild(card);
  }

  document.getElementById("root").style.paddingBottom = "90px";
}
