"use strict";
let lignes = 0;


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
    // FONCTIONNALITÉ 2 : surligner la ligne quand on coche la case
    // (addEventListener "change" : slide 139 ; fonction fléchée : slide 46)
    chk.addEventListener("change", () => highlightRow(chk));
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


function doInsert(nom, prenom, points) {
    // Additionner les points au total (opérateur combiné += : slide 41)
    total_points += points;

    // Incrémenter le compteur de lignes (opérateur ++ : slide 41)
    lignes++;
    const num = lignes;

    doInsertRowTable(num, nom, prenom, points);

    update_summary();
}


function update_summary() {
    // Récupérer les éléments <p> par leur identifiant (getElementById : slide 61)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Modifier leur contenu avec innerText (slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}


function doNewData() {
    // Récupérer les champs de saisie par leur identifiant (getElementById : slide 61)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire l'attribut value de chaque champ (propriété value d'un élément : slide 93)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    // parseInt convertit le texte en entier (indiqué par l'énoncé du TP)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : if..else (slide 42), opérateurs logiques (slide 41)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // alert : boîte de dialogue du BOM (slide 116)
        alert("Formulaire incomplet !");
    } else {
        // 1)  le tableau HTML
        doInsert(nom, prenom, points);

        // 2) le tableau d'objets "persons" 
        persons.push({ nom: nom, prenom: prenom, points: points });

        // 3) Vider les champs pour une autre saisie (propriété value : slide 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
        elt_nom.focus();
    }
}

// Supprime les lignes cochées 
function deleteRow() {
    
    if (lignes === 0) {
        alert("Le tableau est vide !");   // alert : slide 116
        return;                            
    }

    // Étape 2 : récupérer le <tbody> (slide 61) et les checkbox cochées
    // (querySelectorAll avec un sélecteur CSS : slides 76-77)
    const table = document.getElementById("table_body");
    const cochees = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : aucune sélection ?
    if (cochees.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : confirmation (confirm : méthode de window, BOM : slides 111-121)
    if (!confirm("Supprimer " + cochees.length + " ligne(s) ?")) {
        return;   
    }

    // Étape 5 : récupérer toutes les lignes du tableau (slides 76-77)
    const rows = table.querySelectorAll("tr");

    // Étape 6 : parcourir les lignes À L'ENVERS (boucle for : slide 44), pour que
    // splice ne décale pas les indices des lignes restant à traiter
    for (let i = rows.length - 1; i >= 0; i--) {
        const chk = rows[i].querySelector(".col_chkbox input");
        if (chk.checked) {
            // Points de la 4e cellule (children : slide 86), convertis en entier
            const points = parseInt(rows[i].children[3].innerText);
            total_points -= points;   // opérateur combiné : slide 41
            lignes--;                 // décrémenter le compteur
            rows[i].remove();         // supprimer la ligne du DOM (remove : slide 100)
            persons.splice(i, 1);     // supprimer la même entrée dans "persons"
        }
    }

    // Renuméroter les lignes restantes 
    // (forEach + fonction fléchée : slides 44 et 46 ; innerText : slide 91)
    table.querySelectorAll("tr").forEach((row, index) => {
        row.children[0].innerText = index + 1;
    });

    // Étape 7 : message de succès et mise à jour du résumé
    alert(cochees.length + " ligne(s) supprimée(s) !");
    update_summary();
}


function init() {
    
    document.getElementById("search").addEventListener("input", filterRows);

    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}
function consoleTableau() {
    console.table(persons);
}

// ===================== FONCTIONNALITÉS SUPPLÉMENTAIRES (Étape 7) =====================

// FONCTIONNALITÉ 1 : bouton "Imprimer"
// Ouvre la boîte d'impression du navigateur (méthode print de window : BOM, slides 111-121)
// Le CSS @media print masque le formulaire, les boutons et la colonne Select
function imprimer() {
    window.print();
}

// FONCTIONNALITÉ 2 : surligner la ligne dont la case est cochée
function highlightRow(chk) {
    const row = chk.parentElement.parentElement;     // td puis tr (parentElement : slide 86)
    if (chk.checked) {
        row.setAttribute("class", "row selected");   // setAttribute : slide 107
    } else {
        row.setAttribute("class", "row");
    }
}

// FONCTIONNALITÉ 3 : recherche en direct par nom ou prénom
// (masque les lignes qui ne correspondent pas ; les données ne sont pas modifiées)
function filterRows() {
    const terme = document.getElementById("search").value.trim().toLowerCase();
    const rows = document.getElementById("table_body").querySelectorAll("tr");
    rows.forEach((row) => {
        const nom = row.children[1].innerText.toLowerCase();         // children : slide 86
        const prenom = row.children[2].innerText.toLowerCase();
        

        if (nom.includes(terme) || prenom.includes(terme)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}


init();