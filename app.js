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
      </div>`;
  });
}

chargerImages();
