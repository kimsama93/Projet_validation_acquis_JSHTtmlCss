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

//Fonction de validation des données
function validation(nom, prenom, email, etudes, bio) {
  let result = true;
  result = validNom(nom) ? result : false;
  result = validPrenom(prenom) ? result : false;
  result = validEmail(email) ? result : false;

  return result;
}

// Fonciton validation nom
function validNom(nom) {
  let result = true;
  if (nom.length <= 3 || nom.length > 30) {
    result = false;
    const nomErr = document.querySelector("#err-nom");
    nomErr.innerText =
      "Veuillez entrer au minimum 5 charactères sans chiffres.";
    nomErr.classList.add("msg-err");
  } else {
    const nomErr = document.querySelector("#err-nom");
    for (let i = 0; i < nom.length; i++) {
      if (parseInt(nom[i]) >= 0) {
        result = false;
        nomErr.innerText =
          "Veuillez entrer au minimum 5 charactères sans chiffres.";
        nomErr.classList.add("msg-err");
      } else {
        nomErr.innerText = "";
      }
    }
  }
  return result;
}

// Fonciton validation prenom
function validPrenom(prenom) {
  let result = true;
  if (prenom.length <= 3 || prenom.length > 30) {
    result = false;
    const prenomErr = document.querySelector("#err-prenom");
    prenomErr.innerText =
      "Veuillez entrer au minimum 5 charactères sans chiffres.";
    prenomErr.classList.add("msg-err");
  } else {
    const prenomErr = document.querySelector("#err-prenom");
    for (let i = 0; i < prenom.length; i++) {
      if (parseInt(prenom[i]) >= 0) {
        result = false;
        prenomErr.innerText =
          "Veuillez entrer au minimum 5 charactères sans chiffres.";
        prenomErr.classList.add("msg-err");
      } else {
        prenomErr.innerText = "";
      }
    }
  }
  return result;
}

// Fonciton validation email
function validEmail(email) {
  let result = true;
  if (email.length <= 3 || email.length > 30) {
    result = false;
    const emailErr = document.querySelector("#err-email");
    emailErr.innerText = "Veuillez entrer au minimum 5 charactères.";
    emailErr.classList.add("msg-err");
  } else {
    const emailErr = document.querySelector("#err-email");
    let verifArr = false;
    for (let i = 2; i < email.length; i++) {
      verifArr = email[i] == "@" ? true : verifArr;
    }
    if (verifArr == false) {
      result = false;
      emailErr.innerText = "Ceci n'est pas une adresse mail";
      emailErr.classList.add("msg-err");
    } else {
      if (
        email.substr(email.length - 4, 4) != ".com" &&
        email.substr(email.length - 3, 3) != ".fr"
      ) {
        result = false;
        emailErr.innerText = "Ceci n'est pas une adresse mail";
        emailErr.classList.add("msg-err");
      } else {
        result = true;
        emailErr.innerText = "";
      }
    }
  }
  return result;
}

//Fonction ajout de l'étudiant
const btnAjouter = document.querySelector("#btn-ajouter");
btnAjouter.addEventListener("click", ajouter);

function ajouter() {
  //Récupération des données dans le formulaire
  const nom = document.querySelector("#nom").value;
  const prenom = document.querySelector("#prenom").value;
  const email = document.querySelector("#email").value;
  const etudes = document.querySelector("#etudes").value;
  const bio = document.querySelector("#bio").value;
  if (validation(nom, prenom, email, etudes, bio)) {
    if (!localStorage.getItem("storageEtudiants")) {
      const etudiants = [new Student(nom, prenom, email, etudes, bio)];
      localStorage.setItem("storageEtudiants", JSON.stringify(etudiants));
    } else {
      let etudiants = JSON.parse(localStorage.getItem("storageEtudiants"));
      etudiants.push(new Student(nom, prenom, email, etudes, bio));
      localStorage.removeItem("storageEtudiants");
      localStorage.setItem("storageEtudiants", JSON.stringify(etudiants));
    }
    window.location = "Nos_Stagiaires.html";
  }
}
