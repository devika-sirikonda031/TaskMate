// LOAD TASKS FROM LOCALSTORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "All";

// ADD TASK
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  document.getElementById("dueDate").value = "";

  renderTasks();
}

// TOGGLE COMPLETE
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// DELETE TASK
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// FILTER TASKS
function filterTasks(type) {
  currentFilter = type;

  // Active button highlight (optional but clean)
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText === type) btn.classList.add("active");
  });

  renderTasks();
}

// RENDER TASKS
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    return currentFilter === "All" || task.priority === currentFilter;
  });

  filteredTasks.forEach(task => {
    const index = tasks.indexOf(task);
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-text" onclick="toggleTask(${index})">
        ${task.text}
        <span class="badge ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>
        ${task.dueDate ? `<div class="due-date">📅 ${task.dueDate}</div>` : ""}
      </div>
      <div class="actions">
        <button onclick="deleteTask(${index})">✕</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// INITIAL LOAD
renderTasks();
document.querySelector(".filters button").classList.add("active");

