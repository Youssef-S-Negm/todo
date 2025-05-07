let id = 1;

class Todo {
    /**
     * 
     * @param {String} title 
     */
    constructor(title) {
        this.title = title;
        this.status = "pending"
        this.id = id++;
    }
}

const todos = [];

function setUpAddTodoForm() {
    document.getElementById("add-todo-form").onsubmit = function (e) {
        e.preventDefault();

        const input = document.getElementById("add-todo-input");

        if (isValidInput(input.value)) {
            const todo = new Todo(input.value);

            todos.push(todo);
            renderTodos();

            input.value = "";
            return;
        }

        alert("Todo title is empty")
    }
}

function setUpSearchForm() {
    document.getElementById("search-pending-todos-form").onsubmit = function (e) {
        e.preventDefault();

        const searchInput = document.getElementById("search-pending-todos-input");

        if (isValidInput(searchInput.value)) {
            filterCards(searchInput.value);
            return;
        }

        makeAllCardsVisible();
    }
}

setUpAddTodoForm();
setUpSearchForm();

/**
 * 
 * @param {string} input 
 * @returns boolean
 */
function isValidInput(input) {
    return input.trim().length > 0;
}

/**
 * 
 * @param {Todo} todo
 * @returns HTMLDivElement
 */
function createCard(todo) {
    const card = document.createElement("div");
    card.dataset.id = todo.id.toString();
    card.draggable = true;
    card.ondragstart = onDragStart;
    const cardBody = createCardBody(todo);

    card.classList.add("card", "mb-2");
    card.appendChild(cardBody);

    return card;
}

/**
 * 
 * @param {Todo} todo
 * @returns HTMLDivElement
 */
function createCardBody(todo) {
    const cardBody = document.createElement("div");
    const title = createTitle(todo);
    const checkBox = createCheckBox(todo);

    cardBody.classList.add("card-body", "d-flex", "align-items-center", "justify-content-between");
    cardBody.appendChild(title);
    cardBody.appendChild(checkBox);

    return cardBody;
}

/**
 * 
 * @param {Todo} todo 
 * @returns HTMLSpanElement 
 */
function createTitle(todo) {
    const span = document.createElement("span");
    span.textContent = todo.title;

    return span;
}


/**
 * 
 * @param {HTMLDivElement} card 
 * @param {Todo} todo
 * @returns HTMLInputElement
 */
function createCheckBox(todo) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "status";
    checkBox.id = checkBox.name;
    checkBox.checked = (todo.status === "done");

    checkBox.addEventListener('change', function (e) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todo.id) {
                todos[i].status = todos[i].status === "pending" ? "done" : "pending";
                break;
            }
        }

        renderTodos();
    });

    return checkBox;
}

/**
 * 
 * @param {string} input 
 */
function filterCards(input) {
    const todosContainer = document.getElementById("pending-todos");
    const cards = todosContainer.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        const title = cards[i]
            .querySelector(".card-body span")
            .textContent;

        cards[i].style.display = isMatched(title, input) ? "" : "none";
    }
}

/**
 * 
 * @param {string} title 
 * @param {string} input 
 * @returns boolean
 */
function isMatched(title, input) {
    return title.trim().toLowerCase().includes(input.trim().toLowerCase());
}

function makeAllCardsVisible() {
    const todosContainer = document.getElementById("pending-todos");
    const cards = todosContainer.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "";
    }
}

/**
 * 
 * @param {DragEvent} event 
 */
function onDragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.id)
}

/**
 * 
 * @param {string} zoneId 
 */
function setupDropZone(zoneId) {
    const zone = document.getElementById(`${zoneId}-section`);

    zone.addEventListener("dragover", e => {
        e.preventDefault();
    });

    zone.addEventListener("drop", e => {
        e.preventDefault();

        const id = e.dataTransfer.getData("text/plain");

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].status = zoneId === "pending" ? "pending" : "done";
                break;
            }
        }

        renderTodos();
    });
}

setupDropZone("pending");
setupDropZone("completed");

function renderTodos() {
    const pendingTodos = document.getElementById("pending-todos");
    const completedTodos = document.getElementById("completed-todos");
    const pendingTitle = document.createElement("h2");
    const completedTitle = document.createElement("h2");
    const searchTodosForm = document.createElement("form");
    const searchTodosInput = document.createElement("input");
    const searchBtn = document.createElement("button");
    const searchIcon = document.createElement("i");

    pendingTodos.innerHTML = "";
    completedTodos.innerHTML = "";
    pendingTitle.textContent = "Pending Todos";
    completedTitle.textContent = "Completed Todos";

    searchTodosForm.id = "search-pending-todos-form";
    searchTodosForm.classList.add("d-flex", "align-items-center", "gap-2", "mb-3");

    searchTodosInput.type = "text";
    searchTodosInput.id = "search-pending-todos-input";
    searchTodosInput.placeholder = "Search your todos";
    searchTodosInput.classList.add("rounded", "p-1");

    searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "text-light");

    searchBtn.type = "submit";
    searchBtn.classList.add("btn", "bg-primary");
    searchBtn.appendChild(searchIcon);

    searchTodosForm.appendChild(searchTodosInput);
    searchTodosForm.appendChild(searchBtn);

    pendingTodos.appendChild(pendingTitle);
    pendingTodos.appendChild(searchTodosForm);
    completedTodos.appendChild(completedTitle);

    setUpSearchForm();

    todos.forEach(todo => {
        if (todo.status === "pending") {
            pendingTodos.appendChild(createCard(todo));
        } else {
            completedTodos.appendChild(createCard(todo));
        }
    })
}
