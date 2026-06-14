/* ================= TASKFLOW ================= */

let tasks =
    JSON.parse(localStorage.getItem("taskflowTasks")) || [];

const taskForm =
    document.getElementById("taskForm");

const taskContainer =
    document.getElementById("taskContainer");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const filterTasks =
    document.getElementById("filterTasks");

/* ================= EDIT MODAL ELEMENTS ================= */

const editModal =
    document.getElementById("editModal");

const editTitle =
    document.getElementById("editTaskTitle");

const editDescription =
    document.getElementById("editTaskDescription");

const saveEditBtn =
    document.getElementById("saveEditBtn");

const closeModalBtn =
    document.getElementById("closeModal");

let currentEditId = null;

/* ================= SAVE TASKS ================= */

function saveTasks(){

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}

/* ================= DASHBOARD STATS ================= */

function updateStats(){

    const total =
        tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        tasks.filter(task => !task.completed).length;

    const highPriority =
        tasks.filter(
            task => task.priority === "High"
        ).length;

    document.getElementById("totalTasks").textContent =
        total;

    document.getElementById("completedTasks").textContent =
        completed;

    document.getElementById("pendingTasks").textContent =
        pending;

    document.getElementById("highPriorityTasks").textContent =
        highPriority;

}

/* ================= DISPLAY TASKS ================= */

function displayTasks(){

    taskContainer.innerHTML = "";

    let filteredTasks = [...tasks];

    const searchValue =
        searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>

        task.title.toLowerCase().includes(searchValue) ||

        task.description.toLowerCase().includes(searchValue)

    );

    const filterValue =
        filterTasks.value;

    if(filterValue === "completed"){

        filteredTasks =
            filteredTasks.filter(task => task.completed);

    }

    if(filterValue === "pending"){

        filteredTasks =
            filteredTasks.filter(task => !task.completed);

    }

    if(filteredTasks.length === 0){

        emptyState.style.display = "block";

    }

    else{

        emptyState.style.display = "none";

    }

    filteredTasks.forEach(task => {

        const card =
            document.createElement("div");

        card.classList.add("task-card");

        if(task.completed){

            card.classList.add("completed");

        }

        card.innerHTML = `

            <div class="task-header">

                <div>

                    <div class="task-title">
                        ${task.title}
                    </div>

                    ${
                        task.completed
                        ?
                        `<div class="completed-badge">
                            ✓ Completed
                        </div>`
                        :
                        ""
                    }

                </div>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

            <p class="task-description">
                ${task.description}
            </p>

            <p class="task-date">
                Created: ${task.createdAt}
            </p>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleComplete(${task.id})">

                    ${
                        task.completed
                        ? "Undo"
                        : "Complete"
                    }

                </button>

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>

        `;

        taskContainer.appendChild(card);

    });

    updateStats();

}

/* ================= ADD TASK ================= */

if(taskForm){

    taskForm.addEventListener("submit", function(e){

        e.preventDefault();

        const title =
            document.getElementById("taskTitle");

        const description =
            document.getElementById("taskDescription");

        const priority =
            document.getElementById("taskPriority");

        if(title.value.trim() === ""){

            alert("Please enter task title.");

            return;

        }

        const task = {

            id: Date.now(),

            title:
                title.value.trim(),

            description:
                description.value.trim(),

            priority:
                priority.value,

            completed: false,

            createdAt:
                new Date().toLocaleString()

        };

        tasks.push(task);

        saveTasks();

        displayTasks();

        taskForm.reset();

    });

}

/* ================= COMPLETE TASK ================= */

function toggleComplete(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            task.completed =
                !task.completed;

        }

        return task;

    });

    saveTasks();

    displayTasks();

}

/* ================= DELETE TASK ================= */

function deleteTask(id){

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );

    if(!confirmDelete){

        return;

    }

    tasks =
        tasks.filter(task => task.id !== id);

    saveTasks();

    displayTasks();

}

/* ================= EDIT TASK ================= */

function editTask(id){

    const task =
        tasks.find(task => task.id === id);

    if(!task){

        return;

    }

    currentEditId = id;

    if(editTitle){

        editTitle.value =
            task.title;
    }

    if(editDescription){

        editDescription.value =
            task.description;
    }

    if(editModal){

        editModal.classList.add("active");
    }

}

/* ================= SAVE EDIT ================= */

if(saveEditBtn){

    saveEditBtn.addEventListener("click", function(){

        const task =
            tasks.find(
                task => task.id === currentEditId
            );

        if(!task){

            return;

        }

        task.title =
            editTitle.value.trim();

        task.description =
            editDescription.value.trim();

        saveTasks();

        displayTasks();

        editModal.classList.remove("active");

    });

}

/* ================= CLOSE MODAL ================= */

if(closeModalBtn){

    closeModalBtn.addEventListener("click", function(){

        editModal.classList.remove("active");

    });

}

window.addEventListener("click", function(e){

    if(e.target === editModal){

        editModal.classList.remove("active");

    }

});

/* ================= SEARCH ================= */

if(searchInput){

    searchInput.addEventListener(
        "input",
        displayTasks
    );

}

/* ================= FILTER ================= */

if(filterTasks){

    filterTasks.addEventListener(
        "change",
        displayTasks
    );

}

/* ================= INITIAL LOAD ================= */

displayTasks();