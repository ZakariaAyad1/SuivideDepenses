"use strict";
// src/app.ts
// 1. Définition des types et enums
var CategorieDepense;
(function (CategorieDepense) {
    CategorieDepense["ALIMENTATION"] = "Alimentation";
    CategorieDepense["TRANSPORT"] = "Transport";
    CategorieDepense["LOISIRS"] = "Loisirs";
    CategorieDepense["LOGEMENT"] = "Logement";
    CategorieDepense["SANTE"] = "Sant\u00E9";
    CategorieDepense["AUTRE"] = "Autre";
})(CategorieDepense || (CategorieDepense = {}));
// 2. État de l'application
let depenses = [];
let filtreCategorieActif = "ALL";
let triActif = "date-desc"; // Valeur par défaut du select de tri
// 3. Sélection des éléments du DOM
const expenseForm = document.getElementById('expense-form');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const filterCategorySelect = document.getElementById('filter-category');
const sortBySelect = document.getElementById('sort-by');
const expenseListTbody = document.getElementById('expense-list');
const totalExpensesSpan = document.getElementById('total-expenses');
const noExpensesMessage = document.getElementById('no-expenses-message');
const expenseTable = document.getElementById('expense-table');
// 4. Fonctions utilitaires
function genererIdUnique() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
function formaterDate(date) {
    return date.toLocaleDateString('fr-FR'); // Format JJ/MM/AAAA
}
function formaterMontant(montant) {
    return montant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}
// 5. Logique de persistance (localStorage)
function sauvegarderDepenses() {
    localStorage.setItem('depenses', JSON.stringify(depenses));
}
function chargerDepenses() {
    const depensesSauvegardees = localStorage.getItem('depenses');
    if (depensesSauvegardees) {
        const parsedDepenses = JSON.parse(depensesSauvegardees); // any pour la transformation
        depenses = parsedDepenses.map(d => (Object.assign(Object.assign({}, d), { date: new Date(d.date) // Reconvertir la chaîne en objet Date
         })));
    }
}
// 6. Logique métier
function ajouterDepense(titre, montant, categorie, date) {
    const nouvelleDepense = {
        id: genererIdUnique(),
        titre,
        montant,
        categorie,
        date
    };
    depenses.push(nouvelleDepense);
    sauvegarderDepenses();
    mettreAJourAffichage();
}
function appliquerFiltresEtTri() {
    let depensesFiltrees = [...depenses]; // Copie pour ne pas modifier l'original
    // Filtrage
    if (filtreCategorieActif !== "ALL") {
        depensesFiltrees = depensesFiltrees.filter(d => d.categorie === filtreCategorieActif);
    }
    // Tri
    const [critere, ordre] = triActif.split('-');
    depensesFiltrees.sort((a, b) => {
        let comparaison = 0;
        switch (critere) {
            case 'date':
                comparaison = a.date.getTime() - b.date.getTime();
                break;
            case 'amount':
                comparaison = a.montant - b.montant;
                break;
            case 'title':
                comparaison = a.titre.localeCompare(b.titre);
                break;
        }
        return ordre === 'asc' ? comparaison : -comparaison;
    });
    return depensesFiltrees;
}
// 7. Logique d'affichage
function afficherDepenses(depensesAAfficher) {
    expenseListTbody.innerHTML = ''; // Vider la liste existante
    let total = 0;
    if (depensesAAfficher.length === 0) {
        noExpensesMessage.classList.remove('hidden');
        expenseTable.classList.add('hidden');
    }
    else {
        noExpensesMessage.classList.add('hidden');
        expenseTable.classList.remove('hidden');
        depensesAAfficher.forEach(depense => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${depense.titre}</td>
                <td>${formaterMontant(depense.montant)}</td>
                <td>${depense.categorie}</td>
                <td>${formaterDate(depense.date)}</td>
            `;
            expenseListTbody.appendChild(tr);
            total += depense.montant;
        });
    }
    totalExpensesSpan.textContent = formaterMontant(total);
}
function mettreAJourAffichage() {
    const depensesAffichees = appliquerFiltresEtTri();
    afficherDepenses(depensesAffichees);
}
// 8. Initialisation et gestionnaires d'événements
function populerSelectCategories(selectElement, inclureOptionTous = false) {
    if (inclureOptionTous) {
        const optionTous = document.createElement('option');
        optionTous.value = "ALL";
        optionTous.textContent = "Toutes les catégories";
        selectElement.appendChild(optionTous);
    }
    for (const categorie in CategorieDepense) {
        if (isNaN(Number(categorie))) { // S'assurer que c'est bien la clé string de l'enum
            const option = document.createElement('option');
            option.value = CategorieDepense[categorie];
            option.textContent = CategorieDepense[categorie];
            selectElement.appendChild(option);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Charger les dépenses existantes
    chargerDepenses();
    // Populer les selects de catégorie
    populerSelectCategories(categorySelect);
    populerSelectCategories(filterCategorySelect, true);
    // Configurer la date par défaut à aujourd'hui pour le formulaire
    dateInput.valueAsDate = new Date();
    // Gestionnaire pour l'ajout de dépense
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const titre = titleInput.value.trim();
        const montant = parseFloat(amountInput.value);
        const categorie = categorySelect.value;
        const date = dateInput.valueAsDate; // Récupère un objet Date directement
        if (titre && !isNaN(montant) && montant > 0 && categorie && date) {
            ajouterDepense(titre, montant, categorie, date);
            expenseForm.reset(); // Réinitialiser le formulaire
            dateInput.valueAsDate = new Date(); // Remettre la date du jour
        }
        else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    });
    // Gestionnaire pour le filtre par catégorie
    filterCategorySelect.addEventListener('change', () => {
        filtreCategorieActif = filterCategorySelect.value;
        mettreAJourAffichage();
    });
    // Gestionnaire pour le tri
    sortBySelect.addEventListener('change', () => {
        triActif = sortBySelect.value;
        mettreAJourAffichage();
    });
    // Affichage initial
    mettreAJourAffichage();
});
//# sourceMappingURL=app.js.map