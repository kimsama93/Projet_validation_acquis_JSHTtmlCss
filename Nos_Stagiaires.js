//CLASSES
class Student {
  constructor(nom, prenom, email, etudes, bio) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.etudes = etudes;
    this.bio = bio;
  }
}

//Récupération du local storage et désserialisation JSON
const etudiants = localStorage.getItem("storageEtudiants")
  ? JSON.parse(localStorage.getItem("storageEtudiants"))
  : [];

//Tableau Etudiant
const tableauEtudiants = document.querySelector("#tableau-etudiants");

function etudiantTab() {
  for (let i = 0; i < etudiants.length; i++) {
    const newTr = document.createElement("tr");
    const newTdNom = document.createElement("td");
    const newTdPrenom = document.createElement("td");
    const newTdEmail = document.createElement("td");

    const btnSupp = document.createElement("button");
    btnSupp.classList.add("btn");
    btnSupp.classList.add("btn-danger");
    btnSupp.type = "button";
    btnSupp.innerText = "Supprimer";
    btnSupp.addEventListener("click", supprimer);

    const btnVoir = document.createElement("button");
    btnVoir.type = "button";
    btnVoir.classList.add("btn", "btn-primary");
    btnVoir.innerText = "Voir";
    btnVoir.addEventListener("click", voir);

    newTdNom.innerText = etudiants[i].nom;
    newTdPrenom.innerText = etudiants[i].prenom;
    newTdEmail.innerText = etudiants[i].email;

    const newBtn = document.createElement("td");
    newBtn.append(btnVoir, btnSupp);
    tableauEtudiants
      .appendChild(newTr)
      .append(newTdNom, newTdPrenom, newTdEmail, newBtn);
  }
}

//Appuis bouton supprimer
function supprimer() {
  etudiants.splice(this.parentElement.parentElement.rowIndex - 1, 1);
  this.parentElement.parentElement.remove();
  affVoir(this);
  localStorage.setItem("storageEtudiants", JSON.stringify(etudiants));
}

//**********ESPACE VOIR ETUDIANT************
//CONSTANTES
const voirEtudiant = document.querySelector("#voir-etudiant");
const voirNom = document.createElement("div");

const voirEmailDiv = document.createElement("div");
const voirEmailSpan = document.createElement("span");
const voirEmailValue = document.createElement("span");

const voirEtudesDiv = document.createElement("div");
const voirEtudesSpan = document.createElement("span");
const voirEtudesValue = document.createElement("span");

const voirBioDiv = document.createElement("div");
const voirBioSpan = document.createElement("span");
const voirBioValue = document.createElement("span");

//FONCTIONS
let etudiant;
//Affichage section "voir"
function affVoir(thisRowEtu) {
  if (
    (etudiant ==
      etudiants[thisRowEtu.parentElement.parentElement.rowIndex - 1] &&
      voirEtudiant.hidden == false) ||
    affVoir.caller.name == "supprimer"
  ) {
    voirEtudiant.hidden = true;
  } else {
    voirEtudiant.hidden = false;
  }
}

//Actualisation des infos à afficher
function voir() {
  affVoir(this);
  if (voirEtudiant.hidden == true) return;

  etudiant = etudiants[this.parentElement.parentElement.rowIndex - 1];
  console.log(this.parentElement.parentElement.rowIndex - 1);

  voirNom.classList.add("voir-bold");
  voirNom.innerText = etudiant.nom + " " + etudiant.prenom;
  voirEtudiant.append(voirNom);

  voirEmailSpan.classList.add("voir-bold");
  voirEmailSpan.innerText = "Email : ";
  voirEmailValue.innerText = etudiant.email;
  voirEtudiant.appendChild(voirEmailDiv).append(voirEmailSpan, voirEmailValue);

  voirEtudesSpan.classList.add("voir-bold");
  voirEtudesSpan.innerText = "Etudes faites : ";
  voirEtudesValue.innerText = etudiant.etudes;
  voirEtudiant
    .appendChild(voirEtudesDiv)
    .append(voirEtudesSpan, voirEtudesValue);

  voirBioSpan.classList.add("voir-bold");
  voirBioSpan.innerText = "Bio : ";
  voirBioValue.innerText = etudiant.bio;
  voirEtudiant.appendChild(voirBioDiv).append(voirBioSpan, voirBioValue);
}

etudiantTab();
