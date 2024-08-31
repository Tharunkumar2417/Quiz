document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText) {
        const tasks = getTasks();
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        saveTasks(tasks);
        input.value = '';
        renderTasks('all');
    }
}

function renderTasks(filter) {
    const tasks = getTasks();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks
        .filter(task => filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed))
        .forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
            taskItem.dataset.id = task.id;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
}

function toggleTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks('all');
    }
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks('all');
}

function filterTasks(status) {
    renderTasks(status);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    renderTasks('all');
}
