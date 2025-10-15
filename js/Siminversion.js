async function Siminversion() {
    const root = document.getElementById("root");
    root.innerHTML = `
        <h2>💸 Simulador de Inversión</h2>
        <p>Simula cuánto habrías ganado si invertías en una criptomoneda hace 7 días.</p>

        <div class="sim-card">
            <label for="moneda">Selecciona una criptomoneda:</label>
            <select id="moneda">
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
                <option value="dogecoin">Dogecoin</option>
                <option value="cardano">Cardano</option>
            </select>

            <label for="monto">Monto invertido (USD):</label>
            <input type="number" id="monto" placeholder="Ej: 100" min="1">

            <button id="btnSimular">Simular</button>
        </div>

        <div id="resultado" class="sim-resultado"></div>
    `;

    document.getElementById("btnSimular").addEventListener("click", async () => {
        const moneda = document.getElementById("moneda").value;
        const monto = parseFloat(document.getElementById("monto").value);
        const resultadoDiv = document.getElementById("resultado");

        if (!monto || monto <= 0) {
            resultadoDiv.innerHTML = `<p class="error">❌ Ingresa un monto válido.</p>`;
            return;
        }

        resultadoDiv.innerHTML = "Calculando...";

        try {
            // Obtener precio actual y de hace 7 días
            const hoyRes = await fetch(`https://api.coingecko.com/api/v3/coins/${moneda}`);
            const actual = await hoyRes.json();
            const precioActual = actual.market_data.current_price.usd;

            const hace7Res = await fetch(`https://api.coingecko.com/api/v3/coins/${moneda}/market_chart?vs_currency=usd&days=7`);
            const hace7Data = await hace7Res.json();
            const precioAntiguo = hace7Data.prices[0][1]; // primer registro (hace 7 días)

            // Cálculo
            const cantidadComprada = monto / precioAntiguo;
            const valorHoy = cantidadComprada * precioActual;
            const ganancia = valorHoy - monto;
            const porcentaje = ((valorHoy / monto - 1) * 100).toFixed(2);

            // Mostrar resultado
            resultadoDiv.innerHTML = `
                <div class="sim-tarjeta">
                    <h3>${actual.name}</h3>
                    <img src="${actual.image.small}" alt="${actual.name}">
                    <p>📅 Inversión hace 7 días: <strong>$${monto.toFixed(2)}</strong></p>
                    <p>💰 Valor actual: <strong>$${valorHoy.toFixed(2)}</strong></p>
                    <p>📈 Cambio: <strong>${porcentaje}%</strong> (${ganancia >= 0 ? "ganancia" : "pérdida"})</p>
                </div>
            `;
        } catch (error) {
            resultadoDiv.innerHTML = `<p class="error">⚠️ Error al obtener los datos. Inténtalo más tarde.</p>`;
            console.error(error);
        }
    });
}
