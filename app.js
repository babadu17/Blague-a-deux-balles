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

  fichiers.forEach(fichier => {
    feed.innerHTML += `
      <div class="card">
        <div class="card-inner">
          <img src="./image/${fichier}" alt="blague">
        </div>
        <div class="side-actions">
          <div class="action-btn" onclick="partager()">
            <div class="icon">↗️</div>
            <span>Partager</span>
          </div>
          <div class="action-btn" onclick="enregistrer(this, './image/${fichier}')">
            <div class="icon">🔖</div>
            <span>Enregistrer</span>
          </div>
        </div>
      </div>`;
  });
}

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

  fichiers.forEach(fichier => {
    feed.innerHTML += `
      <div class="card">
        <div class="card-inner">
          <img src="./image/${fichier}" alt="blague">
        </div>
        <div class="side-actions">
          <div class="action-btn" onclick="partager()">
            <div class="icon">↗️</div>
            <span>Partager</span>
          </div>
          <div class="action-btn" onclick="enregistrer(this, './image/${fichier}')">
            <div class="icon">🔖</div>
            <span>Enregistrer</span>
          </div>
        </div>
      </div>`;
  });
}

function partager() {
  if (navigator.share) {
    navigator.share({
      title: 'Blague à deux balles',
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié ! 📋');
  }
}

function enregistrer(btn, src) {
  const a = document.createElement('a');
  a.href = src;
  a.download = src.split('/').pop();
  a.click();
  btn.classList.add('saved');
  btn.querySelector('span').textContent = 'Enregistré ✅';
}

chargerImages();

function enregistrer(btn, src) {
  const a = document.createElement('a');
  a.href = src;
  a.download = src.split('/').pop();
  a.click();
  btn.classList.add('saved');
  btn.querySelector('span').textContent = 'Enregistré ✅';
}

chargerImages();
