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
var triCroissant = true; // Variable d'état pour le tri (Bonus 2) — slide 37

// ── doInsertRowTable ──────────────────────────────────────────────
// Fonctions — slide 45-46
function doInsertRowTable(num, nom, prenom, points) {
    var tbody  = document.getElementById("table_body"); // getElementById — slide 61-64
    var newRow = document.createElement("tr");           // createElement — slide 104
    newRow.innerHTML =                                   // innerHTML — slide 91
        '<td class="col_number">' + num + '</td>' +
        '<td class="col_text">' + nom + '</td>' +
        '<td class="col_text">' + prenom + '</td>' +
        '<td class="col_text">' + points + '</td>' +
        '<td class="col_chkbox"><input type="checkbox"/></td>';
    tbody.appendChild(newRow);                           // appendChild — slide 103-105
}

// ── update_summary ────────────────────────────────────────────────
// textContent — slide 91 ; getElementById — slide 61-64
function update_summary() {
    document.getElementById("nb_lignes").textContent = lignes + " ligne(s)";
    document.getElementById("total_pts").textContent = "Total point(s) = " + total_points;
}

// ── doInsert ──────────────────────────────────────────────────────
function doInsert(nom, prenom, points) {
    lignes       = lignes + 1;              // Opérateurs arithmétiques — slide 41
    total_points = total_points + parseInt(points);
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

// ── doNewData ─────────────────────────────────────────────────────
function doNewData() {
    var nom    = document.getElementById("input_nom").value;    // .value — getElementById — slide 61-64
    var prenom = document.getElementById("input_prenom").value;
    var points = document.getElementById("input_points").value;

    // Condition if...else — slide 42
    if (nom === "" || prenom === "" || points === "") {
        alert("Tous les champs doivent être remplis !"); // alert() — slide 34
        return;
    }
    doInsert(nom, prenom, points);
    persons.push({ nom: nom, prenom: prenom, points: parseInt(points) }); // push() — slide 38
    document.getElementById("input_nom").value    = "";
    document.getElementById("input_prenom").value = "";
    document.getElementById("input_points").value = "";
}

// ── deleteRow ─────────────────────────────────────────────────────
function deleteRow() {
    var tbody = document.getElementById("table_body"); // getElementById — slide 61-64
    var rows  = tbody.getElementsByTagName("tr");      // getElementsByTagName — slide 66-69

    // Boucle for à rebours — slide 44 (Les Boucles)
    for (var i = rows.length - 1; i >= 0; i--) {
        var row      = rows[i];
        var checkbox = row.querySelector("input[type='checkbox']"); // querySelector — slide 74-76

        // Condition if — slide 42
        if (checkbox !== null && checkbox.checked) {
            var pts = parseInt(row.getElementsByTagName("td")[3].textContent); // getElementsByTagName — slide 66-69
            total_points = total_points - pts; // Opérateurs arithmétiques — slide 41
            lignes       = lignes - 1;
            persons.splice(i, 1);              // splice() — slide 38 (Méthodes de tableau)
            tbody.removeChild(row);            // removeChild() — slide 100-101
        }
    }
    // Renumérotation — boucle for (slide 44) + textContent (slide 91)
    var remainingRows = tbody.getElementsByTagName("tr");
    for (var j = 0; j < remainingRows.length; j++) {
        remainingRows[j].getElementsByTagName("td")[0].textContent = j + 1;
    }
    update_summary();
}

// ── init ──────────────────────────────────────────────────────────
function init() {
    lignes = 0; total_points = 0;
    for (var i = 0; i < persons.length; i++) { // Boucle for — slide 44
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

// ── consoleTableau ────────────────────────────────────────────────
function consoleTableau() {
    console.log("Contenu du tableau persons :", persons); // console.log — slide 33-34
}

// ══════════════════════════════════════════════════════════════════
// FONCTIONNALITÉ BONUS 1 : Sélectionner / Désélectionner tout
// querySelectorAll — slide 77-78 ; classList — slide 108
// ══════════════════════════════════════════════════════════════════
function toggleSelectAll() {
    var checkboxes = document.querySelectorAll("#table_body input[type='checkbox']"); // querySelectorAll — slide 77-78
    var btn        = document.querySelector(".btn-select");                           // querySelector — slide 74-76

    var toutesCoches = true;
    for (var i = 0; i < checkboxes.length; i++) { // Boucle for — slide 44
        if (!checkboxes[i].checked) { toutesCoches = false; break; } // if — slide 42
    }
    for (var j = 0; j < checkboxes.length; j++) {
        checkboxes[j].checked = !toutesCoches; // Opérateur logique ! — slide 41
    }
    btn.textContent = toutesCoches ? "Tout sélectionner" : "Tout désélectionner"; // Ternaire — slide 42
}

// ══════════════════════════════════════════════════════════════════
// FONCTIONNALITÉ BONUS 2 : Tri par Points (croissant / décroissant)
// sort() — slide 38 ; fonction anonyme — slide 46
// ══════════════════════════════════════════════════════════════════
function trierParPoints() {
    // Méthode sort() avec fonction de comparaison anonyme — slide 38, 46
    persons.sort(function(a, b) {
        if (triCroissant) return a.points - b.points; // Opérateurs — slide 41
        else              return b.points - a.points;
    });
    triCroissant = !triCroissant; // Opérateur logique ! — slide 41

    // Vider et reconstruire le tbody — innerHTML — slide 91 ; getElementById — slide 61-64
    document.getElementById("table_body").innerHTML = "";
    lignes = 0; total_points = 0;
    for (var i = 0; i < persons.length; i++) { // Boucle for — slide 44
        doInsert(persons[i].nom, persons[i].prenom, persons[i].points);
    }
}

// ══════════════════════════════════════════════════════════════════
// FONCTIONNALITÉ BONUS 3 : Filtrage en temps réel (nom ou prénom)
// classList.add / classList.remove — slide 108 ; getElementsByTagName — slide 66-69
// ══════════════════════════════════════════════════════════════════
function filtrerTableau() {
    // Lire le champ de recherche — getElementById — slide 61-64
    var recherche = document.getElementById("input_recherche").value.toLowerCase();
    var rows      = document.getElementById("table_body").getElementsByTagName("tr"); // slide 66-69

    for (var i = 0; i < rows.length; i++) { // Boucle for — slide 44
        var cells  = rows[i].getElementsByTagName("td");
        var nom    = cells[1].textContent.toLowerCase(); // textContent — slide 91
        var prenom = cells[2].textContent.toLowerCase();

        // indexOf() — méthode de String — slide 37 ; if — slide 42
        if (nom.indexOf(recherche) !== -1 || prenom.indexOf(recherche) !== -1) {
            rows[i].classList.remove("hidden-row"); // classList.remove — slide 108
        } else {
            rows[i].classList.add("hidden-row");    // classList.add — slide 108
        }
    }
}

init();