const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const output = document.getElementById("output");

function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (!taskText) {
    output.textContent = "Please enter a valid task.";
    return;
  }

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.className = "delete-button";

  deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
    output.textContent = "Task deleted successfully.";
  });

  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = "";
  output.textContent = "";
}

todoForm.addEventListener("submit", addTask);