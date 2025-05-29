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
    git clone 
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
