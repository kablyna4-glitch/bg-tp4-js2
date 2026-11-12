"use strict";

// Ici on déclare un tableau d'objets persons.
// Tableau d'objets — slide 40 (Variables et Constantes — Types Complexes : Tableau d'Objets)
var persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];

// Variable globale pour le compteur de lignes.
// Portée des variables — slide 50-51 (Portée d'une variable — Globale vs Locale)
var lignes = 0;

// Ici on déclare la fonction doInsertRowTable (Fonctions — slide 45-46)
function doInsertRowTable(num, nom, prenom, points) {

    // getElementById — slide 61-64 (DOM — Retrouver par identifiant)
    var tbody = document.getElementById("table_body");

    // createElement — slide 104 (DOM — createElement)
    var newRow = document.createElement("tr");

    // innerHTML — slide 91 (DOM — Propriétés innerHTML/innerText)
    newRow.innerHTML =
        '<td class="col_number">' + num + '</td>' +
        '<td class="col_text">' + nom + '</td>' +
        '<td class="col_text">' + prenom + '</td>' +
        '<td class="col_text">' + points + '</td>' +
        '<td class="col_chkbox"><input type="checkbox"/></td>';

    // appendChild — slide 103-105 (DOM — appendChild)
    tbody.appendChild(newRow);
}

// Ici on déclare doInsert qui incrémente le compteur puis appelle doInsertRowTable.
// Les fonctions sont vues dans le slide 45
function doInsert(nom, prenom, points) {

    // Opérateur arithmétique + — slide 41 (Les Opérateurs)
    lignes = lignes + 1;

    doInsertRowTable(lignes, nom, prenom, points);
}

// Ici on déclare init() qui parcourt le tableau persons.
function init() {

    lignes = 0;

    // Ici on utilise une boucle for pour parcourir le tableau.
    // Boucle for — slide 44 (Les Boucles)
    for (var i = 0; i < persons.length; i++) {
        var p = persons[i];

        doInsert(p.nom, p.prenom, p.points);
    }
}

// Ici on affiche le tableau persons dans la console du navigateur.
// console.log() — slide 33-34 (Familiarités — Outils de développement/Console)
function consoleTableau() {
    console.log("Contenu du tableau persons :", persons);
}

// Appel de init() au chargement.
init();