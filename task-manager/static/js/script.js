let taskCounter = 0; 
document.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
    const response = await fetch("/tasks");
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskCounter = index + 1;  
        displayTask(task, taskCounter);
    });
}

function displayTask(task, taskNumber) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("completed", task.completed);
    taskItem.classList.add("fade-in");  
    taskItem.innerHTML = `
        <span onclick="toggleTask(${task.id})">${taskNumber}. ${task.content}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const response = await fetch("/add_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: taskInput.value })
    });
    const newTask = await response.json();
    taskCounter++;  
    displayTask(newTask, taskCounter); 
    taskInput.value = "";
}

async function toggleTask(taskId) {
    await fetch(`/update_task/${taskId}`, { method: "PUT" });
    loadTasks(); 
}

async function deleteTask(taskId) {
    await fetch(`/delete_task/${taskId}`, { method: "DELETE" });
    taskCounter--;  
    loadTasks();  
}

const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"];
let colorIndex = 0;

function displayTask(task, taskNumber) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("completed", task.completed);
    taskItem.classList.add("fade-in");

    taskItem.style.backgroundColor = colors[colorIndex % colors.length];
    colorIndex++;  

    taskItem.innerHTML = `
        <span onclick="toggleTask(${task.id})">${taskNumber}. ${task.content}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
}
document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "/static/images/2.jpg",
        "/static/images/3.jpg",
        "/static/images/4.jpg",
        "/static/images/5.jpg",
        "/static/images/8.jpg",
        "/static/images/9.jpg",
        "/static/images/10.jpg",
        "/static/images/11.jpg",
        "/static/images/12.jpeg",
        "/static/images/13.png",
        "/static/images/14.jpg",
        "/static/images/15.jpg",
        "/static/images/16.jpg",
        "/static/images/17.png",
        "/static/images/18.png",
        "/static/images/19.jpg"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    document.body.style.backgroundImage = `url(${randomImage})`;
    document.body.style.backgroundSize = "cover";  
    document.body.style.backgroundPosition = "center";
});
