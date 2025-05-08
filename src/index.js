let id = 1;

const TODO_IMPORTANCE_LOW = 1;
const TODO_IMPORTANCE_HIGH = 2;

const SORT_OPTION_DATE_ASC = "date-asc";
const SORT_OPTION_DATE_DESC = "date-desc";
const SORT_OPTION_PRIORITY_ASC = "priority-asc";
const SORT_OPTION_PRIORITY_DESC = "priority-desc";

let sortOption = SORT_OPTION_DATE_ASC;

class Todo {
    /**
     * 
     * @param {String} title 
     */
    constructor(title) {
        this.title = title;
        this.status = "pending"
        this.id = id++;
        this.dateCreated = new Date();
        this.priority = TODO_IMPORTANCE_LOW;
    }
}

/**
 * @type {Todo[]}
 */
const todos = [];
let searchQuery = "";

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

        searchQuery = document.getElementById("search-pending-todos-input").value;

        search();
    }
}

function setUpSortActions() {
    const selectSort = document.getElementById("sort-option")

    selectSort.onchange = function (event) {
        event.preventDefault();
        sortOption = event.target.value;

        renderTodos();
    }

    selectSort.value = sortOption;
}

function search() {
    if (isValidInput(searchQuery)) {
        filterCards(searchQuery);
        return;
    }

    makeAllCardsVisible();
}

setUpAddTodoForm();
setUpSearchForm();
setUpSortActions();

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
    const indicator = createIndicator(todo);
    const title = createTitle(todo);
    const checkBox = createCheckBox(todo);

    cardBody.classList.add("card-body", "d-flex", "align-items-center", "justify-content-between");
    cardBody.appendChild(indicator);
    cardBody.appendChild(title);
    cardBody.appendChild(checkBox);

    return cardBody;
}

/**
 * 
 * @param {Todo} todo 
 * @returns HTMLElement
 */
function createIndicator(todo) {
    const icon = document.createElement("i");

    icon.onclick = function (event) {
        event.preventDefault();

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todo.id) {
                todos[i].priority =
                    todos[i].priority === TODO_IMPORTANCE_LOW ? TODO_IMPORTANCE_HIGH : TODO_IMPORTANCE_LOW;
                break;
            }
        }

        renderTodos();
    }

    if (todo.priority === TODO_IMPORTANCE_LOW) {
        icon.classList.add("fa-solid", "fa-triangle-exclamation", "text-secondary");
        return icon;
    }

    icon.classList.add("fa-solid", "fa-triangle-exclamation", "text-danger");

    return icon;
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
 * @param {Todo} todo
 * @returns HTMLInputElement
 */
function createCheckBox(todo) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "status";
    checkBox.id = todo.id;
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

    const selectSort = document.createElement("select");
    const sortOptionDateAsc = document.createElement("option");
    const sortOptionDateDesc = document.createElement("option");
    const sortOptionPriorityAsc = document.createElement("option");
    const sortOptionPriorityDesc = document.createElement("option");

    pendingTodos.innerHTML = "";
    completedTodos.innerHTML = "";
    pendingTitle.textContent = "Pending Todos";
    completedTitle.textContent = "Completed Todos";

    searchTodosForm.id = "search-pending-todos-form";
    searchTodosForm.classList.add("d-flex", "align-items-center", "gap-2", "mb-3");

    searchTodosInput.type = "text";
    searchTodosInput.id = "search-pending-todos-input";
    searchTodosInput.placeholder = "Search your todos";
    searchTodosInput.value = searchQuery;
    searchTodosInput.classList.add("rounded", "p-1");

    searchIcon.classList.add("fa-solid", "fa-magnifying-glass", "text-light");

    searchBtn.type = "submit";
    searchBtn.classList.add("btn", "bg-primary");
    searchBtn.appendChild(searchIcon);

    searchTodosForm.appendChild(searchTodosInput);
    searchTodosForm.appendChild(searchBtn);

    selectSort.id = "sort-option";
    selectSort.name = "sort-option";
    selectSort.classList.add("rounded", "mb-3");

    sortOptionDateAsc.value = SORT_OPTION_DATE_ASC;
    sortOptionDateAsc.textContent = "date (oldest to newest)"

    sortOptionDateDesc.value = SORT_OPTION_DATE_DESC;
    sortOptionDateDesc.textContent = "date (newest to oldest)"

    sortOptionPriorityAsc.value = SORT_OPTION_PRIORITY_ASC;
    sortOptionPriorityAsc.textContent = "priority (low to high)"

    sortOptionPriorityDesc.value = SORT_OPTION_PRIORITY_DESC;
    sortOptionPriorityDesc.textContent = "priority (high to low)"

    selectSort.appendChild(sortOptionDateAsc);
    selectSort.appendChild(sortOptionDateDesc);
    selectSort.appendChild(sortOptionPriorityAsc);
    selectSort.appendChild(sortOptionPriorityDesc);

    pendingTodos.appendChild(pendingTitle);
    pendingTodos.appendChild(searchTodosForm);
    pendingTodos.appendChild(selectSort);
    completedTodos.appendChild(completedTitle);

    setUpSearchForm();
    setUpSortActions();

    todos.sort((a, b) => {
        switch (sortOption) {
            case SORT_OPTION_DATE_ASC:
                return a.dateCreated - b.dateCreated;

            case SORT_OPTION_DATE_DESC:
                return b.dateCreated - a.dateCreated;

            case SORT_OPTION_PRIORITY_ASC:
                return a.priority - b.priority;

            case SORT_OPTION_PRIORITY_DESC:
                return b.priority - a.priority;
        }
    })

    todos.forEach(todo => {
        if (todo.status === "pending") {
            pendingTodos.appendChild(createCard(todo));
        } else {
            completedTodos.appendChild(createCard(todo));
        }
    })

    search();
}
