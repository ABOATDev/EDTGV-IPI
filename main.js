//Ne jugez pas le code, il est dégueu mais écoutez j'avais la flemme

//*SELECTEURS
const form = document.querySelector("form");
const formButton = document.querySelector("button");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const iFrame = document.querySelector("iframe");

const edtPage = document.querySelector(".edt-page");
const overlay = document.querySelector(".overlay");
const navButton = document.querySelector("nav");
const tip = document.querySelector(".tip");

//*VARIABLES DE BASE
let date = new Date();
const tipTab = [
  "Désolé si ça met du temps, c'est la faute de l'edt.",
  "Grosse ambiance non ?",
  "C'est long non ?",
  "Vous avez bien dormi ?",
  "Ceci n'est pas un message de chargement",
  "Fact : Les gnocchi c'est bon",
  "J'espère que vous n'avez pas trop de cours aujourd'hui.",
  "Il fait beau dehors, non ?",
  "Urgh pourquoi ça met toujours aussi longtemps",
  "Je décline toute responsabilité de code moche",
  "Je sais plus quoi écrire comme message de chargement",
];

//permet de pas déclancher la fonction de tip quand l'iframe à fini de charger
let timerOut = false;

//*FONCTIONS

//*Vérifications et randoù
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function isCharacterALetter(char) {
  return /[a-zA-Z]/.test(char); //REGEX OUAIS OUAIS OUAIS
}

//Ouais j'aurais pu les regrouper en une seule fonction mais flemme de me battre contre les EventListener et il est 1h là
const verifNom = () => {
  if (!isCharacterALetter(nom.value[nom.value.length - 1])) {
    nom.value = nom.value.slice(0, -1);
  }
};

const verifPrenom = () => {
  if (!isCharacterALetter(prenom.value[prenom.value.length - 1])) {
    prenom.value = prenom.value.slice(0, -1);
  }
};

/*
Coeur du progamme, on vérifie si les valeurs des inputs ne sont pas nulles ////comme moi 
puis on change la source de l'iframe par celle de l'edt de l'utilisateur, puis on affiche la page de l'edt, et on lance la fonction poptip()
*/
const submit = function (event) {
  if (prenom.value != "" && nom.value != "") {
    console.log("submit");
    iFrame.src = `https://edtmobiliteng.wigorservices.net//WebPsDyn.aspx?action=posEDTBEECOME&serverid=C&Tel=${prenom.value.toLowerCase()}.${nom.value.toLowerCase()}&date=${
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear()
    }`;
    event.preventDefault();

    edtPage.classList.remove("hide");
    popTip();
  }
};

//Permet de faire pop un message de chargement (venant du tableau plus haut) toute les 3.5 secondes
const popTip = () => {
  setTimeout(() => {
    if (!timerOut) {
      tip.classList.remove("hide");
      tip.innerHTML = tipTab[getRandomInt(tipTab.length)];
      popTip();
    }
  }, 3500);
};

//Quand l'iframe à fini de charger on enlève l'overlay la
iFrame.onload = function () {
  timerOut = true;
  overlay.classList.add("hide");
};

//Permet de revenir à la page d'accueil en cliquant sur le bouton (tout en faisant un gros reset)
navButton.addEventListener("click", function () {
  overlay.classList.remove("hide");
  edtPage.classList.add("hide");
  tip.classList.add("hide");
  timerOut = false;
});

nom.addEventListener("input", verifNom);
prenom.addEventListener("input", verifPrenom);

form.addEventListener("submit", submit, true);
