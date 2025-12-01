
// Sélectionner les éléments du DOM
const inputBox = document.getElementById('inputBox');
const listContainer = document.getElementById('listContainer');
const addBtn = document.getElementById('addBtn');


// Fonction pour ajouter une tâche 
function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("Veuillez écrire quelque chose !");
    return;
  }

  // Créer l'élément LI
  const li = document.createElement('li');
  li.textContent = taskText;

  // Créer le bouton de suppression
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '&times;';
  deleteBtn.className = 'delete-btn';

  // Ajouter le bouton à la tâche
  li.appendChild(deleteBtn);

  // Ajouter la tâche à la liste
  listContainer.appendChild(li);

  // Effacer le champ de saisie
  inputBox.value = '';

  // Ajouter l'événement pour cocher la tâche
  li.addEventListener('click', function(e) {
    if (e.target === deleteBtn) {
      // Si clic sur le bouton de suppression
      li.remove();
    } else {
      // Sinon, basculer la classe checked
      li.classList.toggle('checked');
    }
  });

  // Enregistrer dans le localStorage
  saveData();
}

// Fonction pour sauvegarder la liste dans le stockage local
function saveData() {
  localStorage.setItem('todoData', listContainer.innerHTML);
}

// Fonction pour charger les données sauvegardées
function loadData() {
  const data = localStorage.getItem('todoData');
  if (data) {
    listContainer.innerHTML = data;
    // Ajouter l'événement à chaque tâche
    Array.from(listContainer.children).forEach(li => {
      li.addEventListener('click', function() {
        li.classList.toggle('checked');
        saveData();
      });
      // Ajouter le bouton de suppression
      const btn = li.querySelector('.delete-btn');
      if (btn) {
        btn.onclick = () => {
          li.remove();
          saveData();
        };
      }
    });
  }
}

// Écouter le clic sur le bouton Ajouter
addBtn.addEventListener('click', addTask);


// Charger la liste au chargement de la page
window.onload = loadData;
console.log('JS chargé');  // Vérifie que ton script est bien chargé
console.log(inputBox, addBtn, listContainer);  // Vérifie que les éléments sont trouvés dans le DOM
