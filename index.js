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

document.getElementById("add-todo-form").onsubmit = function (e) {
    e.preventDefault();

    const input = document.getElementById("add-todo-input");

    if (isValidInput(input.value)) {
        const todo = new Todo(input.value);
        const card = createCard(todo);
        const cardBody = createCardBody();
        const title = createTitle(todo.title);
        const checkBox = createCheckBox(card, todo);

        cardBody.appendChild(title);
        cardBody.appendChild(checkBox);
        card.appendChild(cardBody);
        card.draggable = true;
        card.ondragstart = onDragStart;

        document.getElementById("pending-todos").appendChild(card);

        input.value = "";
        return;
    }

    alert("Todo title is empty")
}

document.getElementById("search-pending-todos-form").onsubmit = function (e) {
    e.preventDefault();

    const searchInput = document.getElementById("search-pending-todos-input");

    if (isValidInput(searchInput.value)) {
        filterCards(searchInput.value);
        return;
    }

    makeAllCardsVisible();
}

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
    card.classList.add("card", "mb-2");
    card.dataset.id = todo.id.toString();

    return card;
}

/**
 * 
 * @returns HTMLDivElement
 */
function createCardBody() {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "align-items-center", "justify-content-between");

    return cardBody;
}

/**
 * 
 * @param {string} title 
 * @returns HTMLSpanElement 
 */
function createTitle(title) {
    const span = document.createElement("span");
    span.textContent = title;

    return span;
}


/**
 * 
 * @param {HTMLDivElement} card 
 * @param {Todo} todo
 * @returns HTMLInputElement
 */
function createCheckBox(card, todo) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "status";
    checkBox.id = checkBox.name;

    checkBox.addEventListener('change', function (e) {
        if (e.target.checked) {
            todo.status = "done";
            moveToCompletedTodos(card);
            return;
        }

        todo.status = "pending";
        moveToPendingTodos(card);
    });

    return checkBox;
}

/**
 * 
 * @param {HTMLDivElement} card 
 */
function moveToCompletedTodos(card) {
    document.getElementById("pending-todos").removeChild(card);
    document.getElementById("completed-todos").appendChild(card);
}

/**
 * 
 * @param {HTMLDivElement} card 
 */
function moveToPendingTodos(card) {
    document.getElementById("completed-todos").removeChild(card);
    document.getElementById("pending-todos").appendChild(card);
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
 * @param {string} status 
 */
function setupDropZone(zoneId, status) {
    const zone = document.getElementById(`${zoneId}-section`);

    zone.addEventListener("dragover", e => {
        e.preventDefault();
    });

    zone.addEventListener("drop", e => {
        e.preventDefault();
        zone.classList.remove("drag-over");

        const id = e.dataTransfer.getData("text/plain");
        const card = document.querySelector(`[data-id="${id}"]`);

        if (!card || zone === card.parentElement) return;

        document.getElementById(`${zoneId}-todos`).appendChild(card);

        const cb = card.querySelector('input[type="checkbox"]');
        cb.checked = (status === "done");
    });
}

setupDropZone("pending", "pending");
setupDropZone("completed", "done");
