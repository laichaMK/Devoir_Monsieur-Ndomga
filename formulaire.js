
let tabMatiereNotes = [];
//Fonction pour construire l'objet des matieres
function Tmatiere(matiere, note) {
    this.matiere = matiere;
    this.note = note;


    //Fonction pour construire l'objet des debouches
    function Tdebouche(code, nom) {
        this.code = code;
        this.nom = nom;
    }
    //Fonction pour construire l'objet des parcours
    function Tparcours(code, nom, debouches) {
        this.code = code;
        this.nom = nom;
        this.debouches = debouches;
    }
    //Fonction pour construire l'objet  des notes
    function Tnote(code, valeur) {
        this.code = code;
        this.valeur = valeur;
    }
    //Fonction pour construire l'objet des etudiants
    function Tetudiant(mat, nom, prenom, dateNaiss, lieuNaiss, genre, taille, poids, parcours, matieretable) {

        this.mat = mat;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaiss = dateNaiss;
        this.lieuNaiss = lieuNaiss;
        this.genre = genre;
        this.taille = taille;
        this.poids = poids;
        this.parcours = parcours;
        this.matieretable = matieretable

    }
    let tableEtudiant = JSON.parse(localStorage.getItem('etudiants'));
    console.log(tableEtudiant);



    //recupere le boutton on lui ajoute un evenement onclick
    let btn = document.getElementById('bouton');
    btn.addEventListener(
        // (e) es l'action que l'evenement doit effectuer l'orsqu'on appelle cette fonction
        'click', (e) => {
            // pour ne pas recharger la page quand on clique
            e.preventDefault();
            // on mets les inputs dans les variables
            let mat = document.getElementById("mat");
            let nom = document.getElementById("nom");
            let prenom = document.getElementById("prenom");
            let dateNaiss = document.getElementById("date_naiss");
            let lieuNaiss = document.getElementById("lieu_naiss");
            let genre = document.getElementById("genre");
            let taille = document.getElementById("taille");
            let poids = document.getElementById("poids");
            let parcours = document.getElementById("parcours");





            // on construis l'objet en question avec ses valeurs
            let etudiant = new Tetudiant(mat.value, nom.value, prenom.value, dateNaiss.value, lieuNaiss.value, genre.value, taille.value, poids.value, parcours.value, tab);

            if (!tableEtudiant) {
                tableEtudiant = [];
            }

            tableEtudiant.push(etudiant);
            localStorage.setItem('etudiants', JSON.stringify(tableEtudiant));

            // on recupere l'id du tableau qu'on souhaite ajouter les elements 
            let table = document.getElementById("tab");
            let tr = '';

            tableEtudiant.forEach((elt, id) => {
                tr += `<tr>
                            <td>${elt.mat} </td>
                            <td>${elt.nom} ${elt.prenom}</td>
                            <td>${elt.dateNaiss}</td>
                            <td>${elt.lieuNaiss}</td>
                            <td>${elt.genre}</td>
                            <td>${elt.taille}</td>
                            <td>${elt.poids}</td>
                            <td>${elt.parcours}</td>
                            <td><i class="fa fa-square-minus" onclick="deleteEtudiant(${id})"></i>
                            <i class="fa fa-square-plus" onclick="detail(${id})"></i></td>
                        </tr>`;
            })

            table.innerHTML = tr;
        })

}

let btn2 = document.getElementById('add');
btn2.addEventListener('click', (e) => {
    e.preventDefault();
    let matieres = document.getElementById('matieres');
    let matiere = matieres.options[matieres.selectedIndex].value;
    let notes = document.getElementById('notes');
    let matiereNote = new Tmatiere(matiere, notes.value);
    tabMatiereNotes.push(matiereNote);
    let table2 = document.getElementById('note-mat');
    let tr = '';
    tabMatiereNotes.forEach((elt, id) => {
        tr += `
        <tr>
        <td>${elt.matiere}</td>
        <td>${elt.note}</td>
        <td><i class="fa fa-square-minus" onclick="suppression(${id})"></i></td>
       </tr>`

    })
    table2.innerHTML = tr;
})

let supprimer = document.getElementById('supprimer');
supprimer.onclick = (e) => {
    e.preventDefault();
    document.getElementById('note-mat').innerHTML = '';

}
function suppression(id) {
    let table2 = document.getElementById('note-mat');
    tabMatiereNotes.splice(id, 1); let tr = '';
    tabMatiereNotes.forEach((elt, id) => {
        tr += `
        <tr>
        <td>${elt.matiere}</td>
        <td>${elt.note}</td>
        <td><i class="fa fa-square-minus" onclick="suppression(${id})"></i></td>
       </tr>`

    })
    table2.innerHTML = tr;

}



function deleteEtudiant(id) {
    tableEtudiant.splice(id, 1);
    let table = document.getElementById("tab");
    let tr = '';

    tableEtudiant.forEach((elt, id) => {
        tr += `<tr>
                            <td>${elt.mat} </td>
                            <td>${elt.nom} ${elt.prenom}</td>
                            <td>${elt.dateNaiss}</td>
                            <td>${elt.lieuNaiss}</td>
                            <td>${elt.genre}</td>
                            <td>${elt.taille}</td>
                            <td>${elt.poids}</td>
                            <td>${elt.parcours}</td>
                            <td><i class="fa fa-square-minus" onclick="deleteEtudiant(${id})"></i>
                            <i class="fa fa-square-plus" onclick="detail(${id})"></i></td>
                        </tr>`;
    })

    table.innerHTML = tr;

}
