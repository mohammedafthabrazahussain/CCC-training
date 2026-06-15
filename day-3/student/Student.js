const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const saveButton = document.getElementById("saveButton");
const studentList = document.getElementById("studentList");
const message = document.getElementById("message");

let students = [];
let editId = null;

function showMessage(text) {
  message.textContent = text;
}

function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  courseInput.value = "";
  editId = null;
  saveButton.textContent = "Add Student";
}

function saveStudent(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const course = courseInput.value.trim();

  if (!name || !age || !course) {
    showMessage("Please fill in all fields.");
    return;
  }

  if (editId === null) {
    const student = {
      id: Date.now(),
      name: name,
      age: age,
      course: course,
    };
    students.push(student);
    showMessage("Student added.");
  } else {
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === editId) {
        students[i].name = name;
        students[i].age = age;
        students[i].course = course;
        showMessage("Student updated.");
        break;
      }
    }
  }

  clearForm();
  renderStudents();
}

function editStudent(id) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      nameInput.value = students[i].name;
      ageInput.value = students[i].age;
      courseInput.value = students[i].course;
      editId = id;
      saveButton.textContent = "Update Student";
      showMessage("Edit the fields and click save.");
      return;
    }
  }
}

function deleteStudent(id) {
  const newStudents = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].id !== id) {
      newStudents.push(students[i]);
    }
  }
  students = newStudents;
  if (editId === id) {
    clearForm();
  }
  showMessage("Student deleted.");
  renderStudents();
}

function renderStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    studentList.innerHTML = "<p class='empty'>No students added yet.</p>";
    return;
  }

  for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const card = document.createElement("div");
    card.className = "student-card";

    const info = document.createElement("div");
    info.innerHTML =
      "<p><strong>" + student.name + "</strong></p>" +
      "<p>" + student.age + " years • " + student.course + "</p>";

    const actions = document.createElement("div");
    actions.className = "actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = function () {
      editStudent(student.id);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = function () {
      deleteStudent(student.id);
    };

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    card.appendChild(info);
    card.appendChild(actions);
    studentList.appendChild(card);
  }
}

form.addEventListener("submit", saveStudent);
renderStudents();