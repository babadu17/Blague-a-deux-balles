let toutesLesImages = [];
let imagesVues = [];
let imagesRestantes = [];
const feed = document.getElementById("feed");

async function chargerImages() {
  const response = await fetch("./image/registre.json");
  toutesLesImages = await response.json();

  imagesVues = JSON.parse(localStorage.getItem("imagesVues") || "[]");
  imagesRestantes = toutesLesImages.filter(f => !imagesVues.includes(f));

  if (imagesRestantes.length === 0) {
    imagesVues = [];
    imagesRestantes = [...toutesLesImages];
    localStorage.setItem("imagesVues", JSON.stringify(imagesVues));
  }

  melangerTableau(imagesRestantes);
  ajouterCartes(3);
}

function ajouterCartes(n) {
  for (let i = 0; i < n; i++) {
    const fichier = piocherImage();
    if (!fichier) break;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
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
      </div>`;

    feed.appendChild(card);
  }

  observerDerniereCarte();
}

function piocherImage() {
  if (imagesRestantes.length === 0) {
    imagesVues = [];
    imagesRestantes = [...toutesLesImages];
    melangerTableau(imagesRestantes);
    localStorage.setItem("imagesVues", JSON.stringify(imagesVues));
  }

  const fichier = imagesRestantes.shift();
  imagesVues.push(fichier);
  localStorage.setItem("imagesVues", JSON.stringify(imagesVues));
  return fichier;
}

let observer = null;

function observerDerniereCarte() {
  if (observer) observer.disconnect();

  const cards = feed.querySelectorAll(".card");
  const derniere = cards[cards.length - 1];
  if (!derniere) return;

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      ajouterCartes(1);
    }
  }, {
    root: feed,      // observe dans le feed, pas dans window
    threshold: 0.5
  });

  observer.observe(derniere);
}

function melangerTableau(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
  return tableau;
}

async function partager(src) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const file = new File([blob], src.split('/').pop(), { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: 'Blague à deux balles', files: [file] });
    } else {
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
