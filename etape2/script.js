"use strict";

/** 
 * Fonction doInsertRowTable : insère une nouvelle ligne dans le tableau HTML.
 * Paramètres : num, nom, prenom, points
 */
function doInsertRowTable(num, nom, prenom, points) {

    // On utilise getElementById(), vu dans le slide 61-64

    var tbody = document.getElementById("table_body");

    // On utilise createElement(), vu dans le slide 104

    var newRow = document.createElement("tr");

    // On utilise innerHTML, vu dans le slide 91
    // (Manipulation du DOM - Propriétés innerHTML/innerText)
    newRow.innerHTML =
        '<td class="col_number">' + num + '</td>' +
        '<td class="col_text">' + nom + '</td>' +
        '<td class="col_text">' + prenom + '</td>' +
        '<td class="col_text">' + points + '</td>' +
        '<td class="col_chkbox"><input type="checkbox"/></td>';


    // On utilise appendChild(), vu dans le slide 103-105
    // (Manipulation du DOM - méthode appendChild)
    tbody.appendChild(newRow);
}
