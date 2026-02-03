const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 1. Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', getTasks);

// 2. Evento para añadir tarea
addBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === "") return;
    
    const taskObj = {
        text: taskInput.value,
        completed: false
    };

    createTaskElement(taskObj.text, taskObj.completed);
    saveLocalTask(taskObj);
    taskInput.value = "";
});

// 3. Crear el HTML de la tarea
function createTaskElement(text, completed) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="delete-btn">X</button>
    `;

    // Click para tachar
    li.querySelector('.task-text').addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalTask(text);
    });

    // Click para eliminar
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTask(text);
    });

    taskList.appendChild(li);
}

// --- FUNCIONES DE ALMACENAMIENTO (LocalStorage) ---

function saveLocalTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
    
    // Poner fecha
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('date').innerHTML = new Date().toLocaleDateString('es-ES', options);
}

function removeLocalTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

function updateLocalTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(t => {
        if(t.text === taskText) t.completed = !t.completed;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}