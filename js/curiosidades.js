async function Curiosidades() {
    const root = document.getElementById("root");
    root.innerHTML = "<h2>💡 Curiosidades Crypto</h2>";

    const res = await fetch("https://api.coingecko.com/api/v3/global");
    const data = await res.json();

    const info = data.data;
    root.innerHTML += `
      <p>🌍 Criptomonedas totales: ${info.active_cryptocurrencies}</p>
      <p>🏦 Mercados activos: ${info.markets}</p>
      <p>💰 Dominancia de BTC: ${info.market_cap_percentage.btc.toFixed(2)}%</p>
      <p>🪙 Dominancia de ETH: ${info.market_cap_percentage.eth.toFixed(2)}%</p>
      <p>📈 Capitalización total del mercado: $${info.total_market_cap.usd.toLocaleString()}</p>
      <p>🔮 Se actualiza cada 10 minutos con los datos globales de CoinGecko.</p>
    `;
}
