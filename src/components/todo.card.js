import { TODO_IMPORTANCE_HIGH, TODO_IMPORTANCE_LOW } from "../constants/constants.js";
import Todo from "../model/todo.model.js";
import state from "../state.js";
import renderTodos from "../utils/render.js";

/**
 * 
 * @param {Todo} todo
 * @returns HTMLDivElement
 */
export default function createCard(todo) {
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
 * @param {DragEvent} event 
 */
function onDragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.id)
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

        for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === todo.id) {
                state.todos[i].priority =
                    state.todos[i].priority === TODO_IMPORTANCE_LOW ? TODO_IMPORTANCE_HIGH : TODO_IMPORTANCE_LOW;
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
        for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === todo.id) {
                state.todos[i].status = state.todos[i].status === "pending" ? "done" : "pending";
                break;
            }
        }

        renderTodos();
    });

    return checkBox;
}
