
enum CategorieDepense {
    ALIMENTATION = "Alimentation",
    TRANSPORT = "Transport",
    LOISIRS = "Loisirs",
    LOGEMENT = "Logement",
    SANTE = "Santé",
    AUTRE = "Autre"
}

interface Depense {
    id: string;
    titre: string;
    montant: number;
    categorie: CategorieDepense;
    date: Date;
}

// 2. État de l'application
let depenses: Depense[] = [];
let filtreCategorieActif: CategorieDepense | "ALL" = "ALL";
let triActif: string = "date-desc"; // Valeur par défaut du select de tri

// 3. Sélection des éléments du DOM
const expenseForm = document.getElementById('expense-form') as HTMLFormElement;
const titleInput = document.getElementById('title') as HTMLInputElement;
const amountInput = document.getElementById('amount') as HTMLInputElement;
const categorySelect = document.getElementById('category') as HTMLSelectElement;
const dateInput = document.getElementById('date') as HTMLInputElement;

const filterCategorySelect = document.getElementById('filter-category') as HTMLSelectElement;
const sortBySelect = document.getElementById('sort-by') as HTMLSelectElement;

const expenseListTbody = document.getElementById('expense-list') as HTMLTableSectionElement;
const totalExpensesSpan = document.getElementById('total-expenses') as HTMLSpanElement;
const noExpensesMessage = document.getElementById('no-expenses-message') as HTMLParagraphElement;
const expenseTable = document.getElementById('expense-table') as HTMLTableElement;


// 4. Fonctions utilitaires

function genererIdUnique(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function formaterDate(date: Date): string {
    return date.toLocaleDateString('fr-FR'); // Format JJ/MM/AAAA
}

function formaterMontant(montant: number): string {
    return montant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// 5. Logique de persistance (localStorage)
function sauvegarderDepenses(): void {
    localStorage.setItem('depenses', JSON.stringify(depenses));
}

function chargerDepenses(): void {
    const depensesSauvegardees = localStorage.getItem('depenses');
    if (depensesSauvegardees) {
        const parsedDepenses = JSON.parse(depensesSauvegardees) as any[]; // any pour la transformation
        depenses = parsedDepenses.map(d => ({
            ...d,
            date: new Date(d.date) // Reconvertir la chaîne en objet Date
        }));
    }
}

// 6. Logique métier

function ajouterDepense(titre: string, montant: number, categorie: CategorieDepense, date: Date): void {
    const nouvelleDepense: Depense = {
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

function appliquerFiltresEtTri(): Depense[] {
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

function afficherDepenses(depensesAAfficher: Depense[]): void {
    expenseListTbody.innerHTML = ''; // Vider la liste existante
    let total = 0;

    if (depensesAAfficher.length === 0) {
        noExpensesMessage.classList.remove('hidden');
        expenseTable.classList.add('hidden');
    } else {
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

function mettreAJourAffichage(): void {
    const depensesAffichees = appliquerFiltresEtTri();
    afficherDepenses(depensesAffichees);
}

// 8. Initialisation et gestionnaires d'événements

function populerSelectCategories(selectElement: HTMLSelectElement, inclureOptionTous: boolean = false): void {
    if (inclureOptionTous) {
        const optionTous = document.createElement('option');
        optionTous.value = "ALL";
        optionTous.textContent = "Toutes les catégories";
        selectElement.appendChild(optionTous);
    }
    for (const categorie in CategorieDepense) {
        if (isNaN(Number(categorie))) { // S'assurer que c'est bien la clé string de l'enum
            const option = document.createElement('option');
            option.value = CategorieDepense[categorie as keyof typeof CategorieDepense];
            option.textContent = CategorieDepense[categorie as keyof typeof CategorieDepense];
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
        const categorie = categorySelect.value as CategorieDepense;
        const date = dateInput.valueAsDate; // Récupère un objet Date directement

        if (titre && !isNaN(montant) && montant > 0 && categorie && date) {
            ajouterDepense(titre, montant, categorie, date);
            expenseForm.reset(); // Réinitialiser le formulaire
            dateInput.valueAsDate = new Date(); // Remettre la date du jour
        } else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    });

    // Gestionnaire pour le filtre par catégorie
    filterCategorySelect.addEventListener('change', () => {
        filtreCategorieActif = filterCategorySelect.value as CategorieDepense | "ALL";
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