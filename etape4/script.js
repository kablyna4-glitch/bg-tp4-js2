"use strict";

// Tableau d'objets — slide 40
var persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];

// Variables globales — slide 50-51 (Portée d'une variable)
var lignes = 0;
var total_points = 0;

// Fonction pour ajouter une ligne au tableau
// createElement — slide 104 ; getElementById — slide 61-64
function doInsertRowTable(num, nom, prenom, points) {
    var tbody = document.getElementById("table_body");
    var newRow = document.createElement("tr");

    // innerHTML — slide 91
    newRow.innerHTML =
        '<td class="col_number">' + num + '</td>' +
        '<td class="col_text">' + nom + '</td>' +
        '<td class="col_text">' + prenom + '</td>' +
        '<td class="col_number">' + points + '</td>' +
        '<td class="col_chkbox"><input type="checkbox"/></td>';

    // appendChild — slide 103-105
    tbody.appendChild(newRow);
}

// Fonction pour mettre à jour l'espace résumé
// getElementById — slide 61-64
// textContent : modification du contenu textuel d'un élément
function update_summary() {
    document.getElementById("p1").textContent =
        lignes + " ligne(s)";

    document.getElementById("p3").textContent =
        "Total point(s) = " + total_points;
}

// Fonction pour insérer une personne
// Fonctions — slide 45-46
function doInsert(nom, prenom, points) {

    // Opérateurs arithmétiques — slide 41
    lignes = lignes + 1;
    total_points = total_points + parseInt(points);

    doInsertRowTable(lignes, nom, prenom, points);

    // Mise à jour du résumé
    update_summary();
}

// Fonction d'initialisation
function init() {
    lignes = 0;
    total_points = 0;

    // Boucle for — slide 44
    for (var i = 0; i < persons.length; i++) {
        doInsert(
            persons[i].nom,
            persons[i].prenom,
            persons[i].points
        );
    }
}

// console.log — slide 33-34
function consoleTableau() {
    console.log("Contenu du tableau persons :", persons);
}

// Appel de la fonction d'initialisation
init();