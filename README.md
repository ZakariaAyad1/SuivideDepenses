# SuivideDepenses

# Application de Suivi de Dépenses en TypeScript

Une application web simple mais fonctionnelle pour aider les utilisateurs à suivre, afficher, filtrer et trier leurs dépenses personnelles. L'interface est construite avec HTML/CSS et les interactions sont gérées via le DOM en TypeScript.

## Table des Matières

1.  [Aperçu](#aperçu)
2.  [Fonctionnalités](#fonctionnalités)
3.  [Technologies Utilisées](#technologies-utilisées)
4.  [Prérequis](#prérequis)
5.  [Installation et Lancement](#installation-et-lancement)
6.  [Structure du Projet](#structure-du-projet)
7.  [Utilisation de l'Application](#utilisation-de-lapplication)
8.  [Détails Techniques Clés](#détails-techniques-clés)
    *   [Interfaces TypeScript](#interfaces-typescript)
    *   [Enums pour les Catégories](#enums-pour-les-catégories)
    *   [Gestion des Événements DOM](#gestion-des-événements-dom)
    *   [Logique de Tri et Filtrage](#logique-de-tri-et-filtrage)
    *   [Affichage Dynamique](#affichage-dynamique)
    *   [Persistance des Données (localStorage)](#persistance-des-données-localstorage)
9.  [Captures d'écran](#captures-décran)
10. [Améliorations Possibles](#améliorations-possibles)

## Aperçu

Cette application permet aux utilisateurs d'enregistrer leurs dépenses quotidiennes, de les visualiser sous forme de liste, de calculer le total des dépenses affichées, et d'analyser leurs habitudes de consommation grâce à des outils de filtrage par catégorie et de tri. Les données sont stockées localement dans le navigateur via `localStorage` pour une persistance entre les sessions.

L'objectif principal de ce projet est de démontrer l'utilisation de TypeScript pour la structuration des données (interfaces, enums), la manipulation du DOM, et l'implémentation de logiques de filtrage et de tri dans une application front-end simple.

## Fonctionnalités

*   **Ajout de Dépenses :** Formulaire intuitif pour entrer le titre, le montant, la catégorie et la date d'une nouvelle dépense.
*   **Affichage des Dépenses :** Liste tabulaire claire présentant toutes les dépenses enregistrées avec leurs détails.
*   **Total Cumulé :** Affichage en temps réel du montant total des dépenses actuellement visibles (tenant compte des filtres appliqués).
*   **Filtrage par Catégorie :** Permet à l'utilisateur de se concentrer sur des types de dépenses spécifiques en sélectionnant une catégorie (Alimentation, Transport, Loisirs, etc.).
*   **Tri des Dépenses :** Offre plusieurs options pour organiser la liste des dépenses :
    *   Par Date (du plus récent au plus ancien, ou inversement)
    *   Par Montant (du plus élevé au plus bas, ou inversement)
    *   Par Titre (alphabétique A-Z, ou Z-A)
*   **Persistance des Données :** Les dépenses sont automatiquement sauvegardées dans le `localStorage` du navigateur, permettant aux utilisateurs de retrouver leurs données lors de visites ultérieures.
*   **Interface Utilisateur Simple et Réactive :** L'interface est conçue pour être facile à comprendre et à utiliser, avec des mises à jour dynamiques de l'affichage sans rechargement de page.
*   **Validation de Base :** S'assure que les champs obligatoires sont remplis et que le montant est un nombre positif.
*   **Gestion de l'Affichage Vide :** Un message convivial s'affiche lorsqu'aucune dépense ne correspond aux critères de filtrage ou si aucune dépense n'a encore été ajoutée.

## Technologies Utilisées

*   **HTML5 :** Pour la structure sémantique de la page web.
*   **CSS3 :** Pour la mise en forme visuelle et le style de l'interface utilisateur.
*   **TypeScript :** Langage principal pour toute la logique de l'application, incluant :
    *   La définition des types de données (interfaces, enums).
    *   La manipulation du Document Object Model (DOM).
    *   La gestion des événements utilisateur.
    *   L'implémentation des fonctionnalités de l'application.
*   **DOM API :** Utilisée nativement pour interagir avec les éléments HTML et rendre l'interface dynamique.
*   **LocalStorage API :** Pour la persistance des données côté client.

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir les éléments suivants :

*   **Un navigateur web moderne :** Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, etc.
*   **Node.js et npm (Node Package Manager) :** Nécessaires pour installer TypeScript et compiler le code. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).

## Installation et Lancement

Suivez ces étapes pour mettre en place et lancer l'application sur votre machine locale :

1.  **Cloner le dépôt (ou télécharger les fichiers) :**
    Si vous avez Git installé, clonez le dépôt :
    ```bash
    git clone <URL_DU_DEPOT_DE_CE_PROJET>
    cd <NOM_DU_DOSSIER_PROJET>
    ```
    Sinon, téléchargez les fichiers du projet (`index.html`, `style.css`, `tsconfig.json` et le dossier `src` contenant `app.ts`) et placez-les dans un dossier sur votre ordinateur.

2.  **Installer TypeScript (si non installé globalement ou pour ce projet) :**
    Ouvrez un terminal ou une invite de commande à la racine du dossier du projet.
    Si vous avez un fichier `package.json` configuré avec TypeScript comme dépendance de développement :
    ```bash
    npm install
    ```
    Sinon, pour installer TypeScript localement dans le projet :
    ```bash
    npm install typescript --save-dev
    ```
    Ou globalement (non recommandé pour la portabilité des projets) :
    ```bash
    npm install -g typescript
    ```

3.  **Compiler le code TypeScript :**
    Toujours dans le terminal à la racine du projet, exécutez la commande de compilation TypeScript :
    ```bash
    npx tsc
    ```
    Cette commande lira le fichier `tsconfig.json` et compilera les fichiers `.ts` du dossier `src/` vers le dossier `dist/` (ou selon la configuration de `outDir` dans `tsconfig.json`).
    Un fichier `dist/app.js` (et potentiellement `dist/app.js.map` pour le débogage) sera créé.

    Pour un développement continu, vous pouvez utiliser le mode "watch" qui recompile automatiquement les fichiers lors de leur modification :
    ```bash
    npx tsc -w
    ```

4.  **Ouvrir l'application :**
    Une fois la compilation terminée, ouvrez le fichier `index.html` directement dans votre navigateur web. Vous pouvez faire un double-clic sur le fichier ou utiliser l'option "Ouvrir avec..." de votre explorateur de fichiers.

## Structure du Projet

L'organisation des fichiers du projet est la suivante :

.
├── dist/ # Dossier contenant le JavaScript compilé
│ ├── app.js # Fichier JavaScript principal généré par TypeScript
│ └── app.js.map # Fichier SourceMap (pour le débogage TypeScript dans le navigateur)
├── src/ # Dossier contenant les fichiers source TypeScript
│ └── app.ts # Logique principale de l'application en TypeScript
├── index.html # Fichier principal HTML, structure de la page
├── style.css # Fichier CSS pour la mise en forme et le style
├── tsconfig.json # Fichier de configuration du compilateur TypeScript
└── README.md # Ce fichier de documentation



*   `src/app.ts`: Contient tout le code TypeScript de l'application, y compris les définitions de types, la logique métier, la manipulation du DOM et la gestion des événements.
*   `dist/app.js`: Le code JavaScript transpilé à partir de `app.ts`, qui est réellement exécuté par le navigateur.
*   `index.html`: Définit la structure de l'interface utilisateur, y compris le formulaire, les listes et les contrôles. Il lie également `style.css` et `dist/app.js`.
*   `style.css`: Contient toutes les règles CSS pour l'apparence de l'application.
*   `tsconfig.json`: Configure le compilateur TypeScript (par exemple, la version cible de JavaScript, le répertoire de sortie, les options de vérification strictes).

## Utilisation de l'Application

L'interface utilisateur est divisée en plusieurs sections :

1.  **Formulaire "Ajouter une Dépense" :**
    *   **Titre :** Entrez une description concise de la dépense (ex: "Courses hebdomadaires", "Ticket de métro").
    *   **Montant (€) :** Saisissez le coût de la dépense en euros.
    *   **Catégorie :** Sélectionnez la catégorie appropriée dans le menu déroulant (Alimentation, Transport, etc.).
    *   **Date :** Choisissez la date à laquelle la dépense a été effectuée. Par défaut, la date du jour est sélectionnée.
    *   Cliquez sur le bouton **"Ajouter Dépense"** pour enregistrer. Le formulaire sera réinitialisé.

2.  **Contrôles "Filtres et Tri" :**
    *   **Filtrer par Catégorie :** Choisissez une catégorie dans le menu déroulant pour n'afficher que les dépenses de ce type. Sélectionnez "Toutes les catégories" pour voir toutes les dépenses.
    *   **Trier par :** Sélectionnez un critère pour trier la liste des dépenses (Date, Montant, Titre) et l'ordre souhaité (Plus Récent/Ancien, Décroissant/Croissant, A-Z/Z-A).

3.  **Section "Résumé" :**
    *   Affiche le **"Total des dépenses affichées"** en euros. Ce montant se met à jour dynamiquement en fonction des filtres appliqués.

4.  **Section "Liste des Dépenses" :**
    *   Un tableau affiche les dépenses avec les colonnes : Titre, Montant, Catégorie, Date.
    *   Si aucune dépense n'est à afficher (soit parce qu'aucune n'a été ajoutée, soit à cause des filtres), un message "Aucune dépense à afficher." apparaît.

**Flux d'utilisation typique :**
1.  L'utilisateur ouvre l'application. Les dépenses précédemment enregistrées (si `localStorage` en contient) sont chargées et affichées.
2.  L'utilisateur ajoute une ou plusieurs nouvelles dépenses via le formulaire.
3.  L'utilisateur utilise les options de filtrage et de tri pour analyser ses dépenses.
4.  Le total des dépenses s'ajuste en fonction des filtres.
5.  En fermant et rouvrant le navigateur, les données sont conservées.

## Détails Techniques Clés

### Interfaces TypeScript

Pour assurer la robustesse et la clarté du code, une interface `Depense` est définie pour structurer les données de chaque dépense :
```typescript
// src/app.ts
interface Depense {
    id: string;          // Identifiant unique généré automatiquement
    titre: string;
    montant: number;
    categorie: CategorieDepense; // Utilise l'enum CategorieDepense
    date: Date;
}



L'utilisation d'interfaces permet au compilateur TypeScript de vérifier la conformité des types lors de la manipulation des objets Depense, réduisant ainsi les erreurs potentielles.
Enums pour les Catégories
Les catégories de dépenses sont gérées à l'aide d'un enum TypeScript, CategorieDepense :


// src/app.ts
enum CategorieDepense {
    ALIMENTATION = "Alimentation",
    TRANSPORT = "Transport",
    LOISIRS = "Loisirs",
    LOGEMENT = "Logement",
    SANTE = "Santé",
    AUTRE = "Autre"
}



L'enum offre un moyen typé et centralisé de définir les catégories disponibles. Cela évite les erreurs de frappe, facilite la maintenance et est utilisé pour peupler dynamiquement les menus déroulants de sélection de catégorie dans le formulaire et les filtres.
Gestion des Événements DOM
Les interactions de l'utilisateur avec l'interface sont capturées à l'aide de addEventListener sur les éléments HTML concernés :
La soumission du formulaire (<form id="expense-form">) est interceptée pour traiter les données saisies et ajouter une nouvelle dépense. event.preventDefault() est utilisé pour empêcher le rechargement de la page.
Les changements de sélection dans les menus déroulants de filtre (<select id="filter-category">) et de tri (<select id="sort-by">) déclenchent la mise à jour de l'affichage des dépenses.
Logique de Tri et Filtrage
La fonction appliquerFiltresEtTri() est au cœur de cette fonctionnalité :
Elle commence par créer une copie du tableau principal des dépenses (depenses) pour ne pas altérer l'original.
Filtrage : Si un filtre de catégorie est actif (filtreCategorieActif !== "ALL"), elle utilise la méthode filter() pour ne conserver que les dépenses correspondant à cette catégorie.
Tri : Elle utilise la méthode sort() sur le tableau (potentiellement filtré). La logique de comparaison dépend du critère de tri sélectionné (triActif) :
Date : Compare les timestamps (getTime()) des objets Date.
Montant : Compare directement les valeurs numériques.
Titre : Utilise localeCompare() pour un tri alphabétique correct des chaînes de caractères.
L'ordre (ascendant ou descendant) est déterminé en inversant le résultat de la comparaison si nécessaire.
Affichage Dynamique
La mise à jour de la liste des dépenses et du total est gérée par la fonction afficherDepenses(depensesAAfficher: Depense[]) :
Elle vide d'abord le contenu actuel du <tbody> de la table (<tbody id="expense-list">) pour éviter les duplications.
Elle vérifie si le tableau depensesAAfficher est vide. Si oui, elle affiche le message "Aucune dépense à afficher." et masque le tableau. Sinon, elle masque ce message et affiche le tableau.
Elle itère sur chaque Depense dans depensesAAfficher. Pour chacune :
Elle crée dynamiquement une nouvelle ligne de tableau (<tr>).
Elle peuple cette ligne avec des cellules (<td>) contenant le titre, le montant formaté, la catégorie et la date formatée.
Elle ajoute la ligne complétée au <tbody>.
Elle calcule la somme des montants de toutes les dépenses affichées et met à jour le <span> du total cumulé (<span id="total-expenses">). Les montants et dates sont formatés pour une meilleure lisibilité (ex: format monétaire local, format de date local).
Persistance des Données (localStorage)
Pour que les données ne soient pas perdues à la fermeture du navigateur, l'application utilise localStorage :
Sauvegarde (sauvegarderDepenses()) : Après chaque ajout de dépense, le tableau complet depenses est converti en une chaîne JSON à l'aide de JSON.stringify() et stocké dans localStorage sous la clé 'depenses'.
Chargement (chargerDepenses()) : Au démarrage de l'application (événement DOMContentLoaded), le code tente de récupérer la chaîne JSON depuis localStorage. Si des données existent :
Elles sont désérialisées avec JSON.parse().
Un point crucial est la reconversion des dates : JSON.parse() transforme les dates en chaînes. Il est donc nécessaire de parcourir les objets dépenses récupérés et de convertir chaque propriété date (qui est une chaîne) en un véritable objet Date JavaScript (new Date(d.date)). Ceci est essentiel pour que le tri par date et le formatage fonctionnent correctement.
Captures d'écran
Voici quelques aperçus de l'application en action :
1. Formulaire d'ajout et liste vide :
![alt text](https://via.placeholder.com/700x400.png?text=Formulaire+et+Liste+Vide)

(Description : Vue initiale de l'application avec le formulaire d'ajout et un message indiquant qu'aucune dépense n'est présente.)
2. Liste de dépenses avec quelques entrées :
![alt text](https://via.placeholder.com/700x500.png?text=Liste+des+Dépenses+Remplie)

(Description : La liste des dépenses peuplée, montrant le titre, le montant, la catégorie et la date. Le total cumulé est visible.)
3. Application d'un filtre par catégorie :
![alt text](https://via.placeholder.com/700x450.png?text=Liste+Filtrée+par+Catégorie)

(Description : La liste n'affiche que les dépenses de la catégorie "Alimentation", et le total reflète cette sélection.)
4. Application d'un tri par montant décroissant :
![alt text](https://via.placeholder.com/700x450.png?text=Liste+Triée+par+Montant)

(Description : Les dépenses sont triées du montant le plus élevé au plus bas.)
(Remplacez les URL https://via.placeholder.com/... par les chemins vers vos propres captures d'écran lorsque vous les aurez.)
Améliorations Possibles
Bien que fonctionnelle, cette application peut être étendue avec de nombreuses fonctionnalités supplémentaires :
Modification et Suppression de Dépenses : Ajouter des icônes ou boutons sur chaque ligne pour permettre l'édition ou la suppression d'une dépense existante.
Validation des Entrées Plus Robuste : Mettre en place une validation plus détaillée côté client avec des messages d'erreur clairs (par exemple, montant maximum, format de titre).
Graphiques et Visualisations : Intégrer des graphiques (ex: un camembert montrant la répartition des dépenses par catégorie) en utilisant une bibliothèque comme Chart.js ou D3.js.
Export des Données : Permettre à l'utilisateur d'exporter ses dépenses dans un format courant (CSV, JSON, voire PDF).
Import des Données : Permettre l'importation de dépenses depuis un fichier CSV.
Pagination : Pour les utilisateurs ayant un grand nombre de dépenses, la pagination améliorerait les performances et la lisibilité.
Thèmes / Mode Sombre : Offrir des options de personnalisation de l'apparence.
Recherche : Ajouter un champ de recherche pour trouver rapidement des dépenses par titre ou mots-clés.
Définition de Budgets : Permettre à l'utilisateur de définir des budgets par catégorie et de suivre sa progression.
Tests Unitaires et d'Intégration : Écrire des tests (par exemple avec Jest ou Vitest) pour assurer la fiabilité du code et faciliter les refactorisations.
Internationalisation (i18n) : Rendre l'application traduisible dans plusieurs langues.
Fonctionnalités PWA (Progressive Web App) : Améliorer l'expérience mobile et permettre une utilisation hors-ligne plus avancée.
Utilisation d'un Framework/Bibliothèque UI : Pour des applications plus complexes, envisager l'utilisation de React, Vue, Angular ou Svelte pour une gestion d'état et une composition de composants plus structurées.
Stockage Backend : Pour une persistance des données multi-appareils et plus sécurisée, remplacer localStorage par une base de données et une API backend.
