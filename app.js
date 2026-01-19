// LOAD TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ADD TASK
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text,
    dueDate,
    priority,
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

  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText.toLowerCase() === type) {
      btn.classList.add("active");
    }
  });

  renderTasks();
}

// RENDER TASKS
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = tasks.filter(task =>
    currentFilter === "all" || task.priority === currentFilter
  );

  filtered.forEach(task => {
    const index = tasks.indexOf(task);
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-text" onclick="toggleTask(${index})">
        ${task.text}
        <span class="badge ${task.priority}">
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
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  document.querySelector(".filters button").classList.add("active");
});
