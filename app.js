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
          <div class="action-btn" onclick="partager('./image/${fichier}')">
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

async function partager(src) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const file = new File([blob], src.split('/').pop(), { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Blague à deux balles',
        files: [file]
      });
    } else {
      // Fallback : télécharge l'image si le partage de fichier n'est pas supporté
      const a = document.createElement('a');
      a.href = src;
      a.download = src.split('/').pop();
      a.click();
    }
  } catch (err) {
    console.error('Erreur partage :', err);
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
