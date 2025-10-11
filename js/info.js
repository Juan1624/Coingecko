function Info() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>📘 Glosario Cripto</h2>";

  // Diccionario de términos y definiciones
  const conceptos = {
    "Blockchain": "Red descentralizada donde se registran todas las transacciones digitales. Es la base de las criptomonedas.",
    "Token": "Unidad digital creada dentro de una blockchain, que puede representar valor, acceso o utilidad.",
    "NFT (Token No Fungible)": "Activo digital único que representa propiedad sobre un ítem o arte, imposible de duplicar.",
    "DeFi (Finanzas Descentralizadas)": "Conjunto de servicios financieros sin intermediarios, basados en contratos inteligentes.",
    "Stablecoin": "Criptomoneda cuyo valor está vinculado a un activo estable, como el dólar estadounidense.",
    "Gas Fee": "Tarifa pagada a los validadores de la red para procesar transacciones en blockchains como Ethereum.",
    "Wallet (Billetera)": "Aplicación o dispositivo donde se almacenan y gestionan criptomonedas de forma segura.",
    "Mining (Minería)": "Proceso mediante el cual se validan transacciones y se crean nuevas monedas en una red blockchain.",
    "Halving": "Evento en Bitcoin que reduce a la mitad la recompensa por bloque, afectando su oferta y valor.",
    "Smart Contract": "Programa autoejecutable en la blockchain que ejecuta condiciones predefinidas sin intermediarios.",
  };

  // Mostrar cada término con un diseño simple y limpio
  let html = `<div class="glosario-container">`;
  Object.entries(conceptos).forEach(([term, def]) => {
    html += `
      <div class="card glosario-item">
        <h3>${term}</h3>
        <p>${def}</p>
      </div>
    `;
  });
  html += `</div>`;

  root.innerHTML += html;
}
