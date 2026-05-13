function melangerTableau(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
  return tableau;
}

async function chargerImages() {
  const feed = document.getElementById("feed");
  const response = await fetch("./image/registre.json");
  const fichiers = await response.json();

  melangerTableau(fichiers);

  fichiers.forEach((fichier, i) => {
    const likes = Math.floor(Math.random() * 9000) + 100;

    feed.innerHTML += `
      <div class="card">
        <div class="card-inner">
          <img src="./image/${fichier}" alt="blague">
        </div>
        <div class="card-info">
          <div class="username">@blagueàdeuxballes</div>
          <div class="tag">#blaguenulle</div>
        </div>
        <div class="side-actions">
          <div class="action-btn" onclick="toggleLike(this)">
            <div class="icon">❤️</div>
            <span>${likes}</span>
          </div>
          <div class="action-btn">
            <div class="icon">💬</div>
            <span>Commenter</span>
          </div>
          <div class="action-btn">
            <div class="icon">↗️</div>
            <span>Partager</span>
          </div>
        </div>
      </div>`;
  });
}

function toggleLike(btn) {
  btn.classList.toggle("liked");
  const span = btn.querySelector("span");
  const n = parseInt(span.textContent.replace(/\D/g, ""));
  span.textContent = btn.classList.contains("liked") ? n + 1 : n - 1;
}

chargerImages();
