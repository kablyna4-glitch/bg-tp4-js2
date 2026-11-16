"use strict"; 


let lignes = 0;

// (tableau d'objets : slides 38 à 40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let total_points = 0;

// Insère UNE ligne dans le tableau (fonction avec paramètres : slide 45)
function doInsertRowTable(num, nom, prenom, points) {
    // Récupérer le <tbody> par son identifiant (getElementById : slide 61)
    const table = document.getElementById("table_body");

    // Créer un élément <tr> à partir de zéro (createElement : slide 104)
    const row = document.createElement("tr");

    // Donner la valeur "row" à l'attribut class (setAttribute : slide 107)
    row.setAttribute("class", "row");

    // Créer les 5 colonnes <td> (createElement : slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne (innerText : slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    const chk = document.createElement("input");   // createElement : slide 104
    chk.setAttribute("type", "checkbox");          // setAttribute : slide 107
    col5.append(chk);                              // append : slide 98

    // Affecter les classes CSS de chaque colonne (setAttribute : slide 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne (append : slide 98)
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}

//
//
//
//
function doInsert(nom, prenom, points) {
    //  (opérateur combiné += : slide 41)
    total_points += points;

    
    lignes++;
    const num = lignes;

    doInsertRowTable(num, nom, prenom, points);

   
    update_summary();
}

// Met à jour l'espace "Résumé" (nombre de lignes + total des points)
function update_summary() {
    // Récupérer les éléments <p> par leur identifiant (getElementById : slide 61)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier leur contenu avec innerText (slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

function init() {
    // Boucle for..of (slide 44), appel de doInsert pour chaque objet
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}


function consoleTableau() {
    console.table(persons);
}

init();