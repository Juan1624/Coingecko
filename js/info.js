function Info() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>📘 Glosario Cripto</h2>";

  const conceptos = {
    "Blockchain": "Red descentralizada donde se registran transacciones digitales; base de las criptomonedas.",
    "Token": "Unidad digital dentro de una blockchain que representa valor, acceso o utilidad.",
    "NFT": "Activo digital único que certifica propiedad sobre un ítem o arte.",
    "DeFi": "Servicios financieros sin intermediarios, basados en contratos inteligentes.",
    "Stablecoin": "Criptomoneda cuyo valor está vinculado a un activo estable como el dólar.",
    "Gas Fee": "Tarifa pagada a la red para procesar transacciones.",
    "Wallet": "Aplicación o dispositivo donde se guardan criptomonedas.",
    "Mining": "Proceso que valida transacciones y crea nuevas monedas.",
    "Halving": "Evento de Bitcoin que reduce a la mitad la recompensa de los mineros.",
    "Smart Contract": "Programa que se ejecuta automáticamente al cumplirse condiciones definidas.",
  };

  let html = '<div class="glosario-container">';
  
  for (const term in conceptos) {
    html += `
      <div class="glosario-item">
        <h3>${term}</h3>
        <p>${conceptos[term]}</p>
      </div>
    `;
  }

  html += '</div>';
  root.innerHTML += html;
}
