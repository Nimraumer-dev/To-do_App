
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

//  Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASFtgtzdbEA-FYAmLeZROdxcGlbfFGcqo",
  authDomain: "todo-app-24cf8.firebaseapp.com",
  databaseURL: "https://todo-app-24cf8-default-rtdb.firebaseio.com",
  projectId: "todo-app-24cf8",
  storageBucket: "todo-app-24cf8.firebasestorage.app",
  messagingSenderId: "1070242445196",
  appId: "1:1070242445196:web:8b27cca8fa2efe7b0c08a9",
  measurementId: "G-KYNTGZWHR0"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
let inputBox = document.getElementById("input-box");
let listItem = document.getElementById("listItem");

//  Add task
window.addtask = function () {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
    return;
  }

  const todosRef = ref(db, "todos");
  const newTodoRef = push(todosRef);

  set(newTodoRef, {
    text: inputBox.value,
    completed: false
  });

  inputBox.value = "";
};

//  Show tasks (Realtime)
function showTask() {
  const todosRef = ref(db, "todos");

  onValue(todosRef, (snapshot) => {
    listItem.innerHTML = "";


       updateDeleteAllButton(snapshot);

    snapshot.forEach((childSnapshot) => {
      const todo = childSnapshot.val();
      const todoId = childSnapshot.key;

      let li = document.createElement("li");
      li.innerHTML = todo.text;
      li.setAttribute("data-id", todoId);

      if (todo.completed) {
        li.classList.add("checked");
      }

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      span.setAttribute("data-id", todoId);

      li.appendChild(span);
      listItem.appendChild(li);
    });
  });
}
showTask();

//  Click event for complete & delete
listItem.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const id = e.target.getAttribute("data-id");
    const todoRef = ref(db, "todos/" + id);
    let isChecked = e.target.classList.contains("checked");

    update(todoRef, {
      completed: !isChecked
    });
  } else if (e.target.tagName === "SPAN") {
    const id = e.target.getAttribute("data-id");
    remove(ref(db, "todos/" + id));
  }
});



let deleteAllBtn = document.getElementById("deleteAllBtn");

//  Delete All function
window.deleteAll = function() {
    const todosRef = ref(db, "todos"); // root todos node
    remove(todosRef)
      .then(() => {
        alert("All tasks deleted!");
        // button automatically hide ho jayega snapshot listener se
      })
      .catch((error) => {
        console.error("Error deleting tasks:", error);
      });
};

// Function to show/hide Delete All button based on todos
function updateDeleteAllButton(snapshot) {
    if (snapshot.exists()) {
        deleteAllBtn.style.display = "inline-block"; // Show button
    } else {
        deleteAllBtn.style.display = "none"; // Hide button
    }
}






