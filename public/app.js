
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
let taskCount = document.getElementById("task-count");
let deleteAllBtn = document.getElementById("deleteAllBtn");

//  Add task
window.addtask = function () {
    const text = inputBox.value.trim();
    if (text === "") return;

    const todosRef = ref(db, "todos");
    const newTodoRef = push(todosRef);

    set(newTodoRef, {
        text: text,
        completed: false,
        createdAt: Date.now()
    });

    inputBox.value = "";
};

//  Show tasks (Realtime)
function showTask() {
    const todosRef = ref(db, "todos");

    onValue(todosRef, (snapshot) => {
        listItem.innerHTML = "";
        let count = 0;

        updateDeleteAllButton(snapshot);

        if (!snapshot.exists()) {
            taskCount.textContent = "0 tasks left";
            return;
        }

        snapshot.forEach((childSnapshot) => {
            const todo = childSnapshot.val();
            const todoId = childSnapshot.key;
            if (!todo.completed) count++;

            let li = document.createElement("li");
            li.setAttribute("data-id", todoId);
            if (todo.completed) li.classList.add("checked");

            li.innerHTML = `
                <div class="checkbox">
                    ${todo.completed ? '<i data-lucide="check" style="width:14px;height:14px;"></i>' : ''}
                </div>
                <span class="task-text">${todo.text}</span>
                <button class="delete-btn" data-id="${todoId}">
                    <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
                </button>
            `;

            listItem.appendChild(li);
        });

        taskCount.textContent = `${count} tasks left`;
        
        // Refresh Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });
}
showTask();

//  Click event for complete & delete
listItem.addEventListener("click", function (e) {
    const li = e.target.closest('li');
    if (!li) return;
    
    const id = li.getAttribute("data-id");
    const todoRef = ref(db, "todos/" + id);

    // If clicked delete button
    if (e.target.closest('.delete-btn')) {
        const delId = e.target.closest('.delete-btn').getAttribute('data-id');
        remove(ref(db, "todos/" + delId));
        return;
    }

    // Toggle complete
    let isChecked = li.classList.contains("checked");
    update(todoRef, {
        completed: !isChecked
    });
});

//  Delete All function
window.deleteAll = function() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        const todosRef = ref(db, "todos");
        remove(todosRef).catch((error) => {
            console.error("Error deleting tasks:", error);
        });
    }
};

// Function to show/hide Delete All button based on todos
function updateDeleteAllButton(snapshot) {
    if (snapshot.exists()) {
        deleteAllBtn.style.display = "block";
    } else {
        deleteAllBtn.style.display = "none";
    }
}

// Enter key support
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        window.addtask();
    }
});






