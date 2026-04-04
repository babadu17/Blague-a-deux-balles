const container = document.querySelector(".container");

function melangerTableau(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
  return tableau;
}

async function chargerImages() {
  const response = await fetch("./image/registre.json");
  const fichiers = await response.json();
  const listFichiers = fichiers;

  melangerTableau(listFichiers);

  for (const fichier of listFichiers) {
    const img = document.createElement("img");
    img.src = "./image/" + fichier;
    container.appendChild(img);
  }
}

chargerImages();
