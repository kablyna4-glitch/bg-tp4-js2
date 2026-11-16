"use strict"; 

/* Ce fichier est chargé par <script src="script.js"> à la fin du <body>
   (scripts externes : slides 23-24), donc tous les éléments HTML existent déjà. */

// (variable avec let : slide 37 ; portée globale : slides 50-51)
let lignes = 0;


// (tableau d'objets : slides 38 à 40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

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

    // La dernière colonne contient un <input type="checkbox">
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

    // Rajouter la ligne au tableau (append : slide 98)
    table.append(row);
}

// fonctionn pour insèrer une personne 
function doInsert(nom, prenom, points) {
    
    lignes++;
    const num = lignes;

    doInsertRowTable(num, nom, prenom, points);
}

// Parcourt le tableau "persons" et insère chaque personne dans le tableau HTML
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