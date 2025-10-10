function Favoritos() {
    const root = document.getElementById("root");
    root.innerHTML = "<h2>❤️ Mis Favoritos</h2>";

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        root.innerHTML += "<p>No tienes criptos guardadas.</p>";
        return;
    }

    favoritos.forEach(c => {
        root.innerHTML += `
          <div class="card" onClick="Detalle('${c.id}')">
            <p>${c.name}</p>
          </div>`;
    });
}
