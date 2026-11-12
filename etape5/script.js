"use strict";

// Tableau d'objets — slide 40
var persons = [
    { nom: "nom1", prenom: "prenom1", points: 5 },
    { nom: "nom2", prenom: "prenom2", points: 10 },
    { nom: "nom3", prenom: "prenom3", points: 15 }
];


// Variables globales — slide 50-51
var lignes       = 0;
var total_points = 0;

function doInsertRowTable(num, nom, prenom, points) {
    // getElementById — slide 61-64 ; createElement — slide 104
    var tbody  = document.getElementById("table_body");
    var newRow = document.createElement("tr");
    // innerHTML — slide 91
    newRow.innerHTML =
        '<td class="col_number">' + num + '</td>' +
        '<td class="col_text">' + nom + '</td>' +
        '<td class="col_text">' + prenom + '</td>' +
        '<td class="col_text">' + points + '</td>' +
        '<td class="col_chkbox"><input type="checkbox"/></td>';
    // appendChild — slide 103-105
    tbody.appendChild(newRow);
}

// textContent — slide 91 ; getElementById — slide 61-64
function update_summary() {
    document.getElementById("nb_lignes").textContent = lignes + " ligne(s)";
    document.getElementById("total_pts").textContent = "Total point(s) = " + total_points;
}

function doInsert(nom, prenom, points) {
    // Opérateurs arithmétiques — slide 41
    lignes       = lignes + 1;
    total_points = total_points + parseInt(points);
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

// Ici on lit les champs de saisie, on contrôle et on insère.
function doNewData() {
    // Propriété .value des inputs — getElementById — slide 61-64
    var nom    = document.getElementById("input_nom").value;
    var prenom = document.getElementById("input_prenom").value;
    var points = document.getElementById("input_points").value;

    // Ici on vérifie que les champs ne sont pas vides.
    // Condition if...else — slide 42 (Les Conditions)
    if (nom === "" || prenom === "" || points === "") {
        // alert() — slide 34 (D'autres sorties possibles)
        alert("Tous les champs doivent être remplis !");
        return; // Fonctions — slide 45
    }

    doInsert(nom, prenom, points);

    // Ici on insère dans le tableau persons avec push().
    // Méthodes de tableau (push) — slide 38 (Types Complexes — Les Tableaux)
    persons.push({ nom: nom, prenom: prenom, points: parseInt(points) });

    // Ici on vide les champs — propriété .value — getElementById — slide 61-64
    document.getElementById("input_nom").value    = "";
    document.getElementById("input_prenom").value = "";
    document.getElementById("input_points").value = "";
}

function init() {
    lignes = 0; total_points = 0;
    // Boucle for — slide 44
    for (var i = 0; i < persons.length; i++) {
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

// console.log — slide 33-34
function consoleTableau() {
    console.log("Contenu du tableau persons :", persons);
}

init();