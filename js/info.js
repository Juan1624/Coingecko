function Info() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>📘 Glosario Cripto</h2>
    <div class="descripcion-info">
      Aprende los conceptos más importantes del mundo de las criptomonedas.
    </div>
    <input type="text" id="buscadorGlosario" placeholder="Buscar término...">
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

  function mostrarConceptos(filtro = "") {
    contenedor.innerHTML = "";
    const filtroMin = filtro.toLowerCase();

    for (const [term, def] of Object.entries(conceptos)) {
      if (term.toLowerCase().includes(filtroMin) || def.toLowerCase().includes(filtroMin)) {
        const card = document.createElement("div");
        card.className = "tarjeta-info";
        card.innerHTML = `
          <h3>${term}</h3>
          <p>${def}</p>
        `;
        contenedor.appendChild(card);
      }
    }

    if (contenedor.innerHTML === "") {
      contenedor.innerHTML = `<p style="color:#aaa;">No se encontraron resultados.</p>`;
    }
  }

  document.getElementById("buscadorGlosario").addEventListener("input", (e) => {
    mostrarConceptos(e.target.value);
  });

  mostrarConceptos(); 

  document.getElementById("root").style.paddingBottom = "90px";
}
