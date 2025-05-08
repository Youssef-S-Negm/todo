import { addTodo, updateTodoStatus } from "../firebase/todo.service.js";
import Todo from "../model/todo.model.js";
import state from "../state.js";
import renderTodos from "../utils/render.js";
import search from "../utils/search.js";
import isValidInput from "../utils/validation.js";

export function setUpAddTodoForm() {
    document
        .getElementById("add-todo-form")
        .addEventListener('submit', onAddTodo);
}

export function setUpSearchForm() {
    document
        .getElementById("search-pending-todos-form")
        .addEventListener('submit', onSearchTodos);
}

export function setUpSortActions() {
    const selectSort = document.getElementById("sort-option");

    selectSort.addEventListener('change', onChangeSortOption);

    selectSort.value = state.sortOption;
}

/**
 * 
 * @param {string} zoneId 
 */
export function setupDropZone(zoneId) {
    const zone = document.getElementById(`${zoneId}-section`);

    zone.addEventListener("dragover", e => {
        e.preventDefault();
    });

    zone.addEventListener("drop", async e => await onDropCard(e, zoneId));
}


/**
 * 
 * @param {SubmitEvent} event 
 */
async function onAddTodo(event) {
    event.preventDefault();

    const input = document.getElementById("add-todo-input");

    if (isValidInput(input.value)) {
        const todo = new Todo(input.value);

        try {
            const addedDoc = await addTodo(todo);
            todo.id = addedDoc.id

            state.todos.push(todo);
            renderTodos();

            input.value = "";
        } catch (error) {
            console.error(error);
        }

        return;
    }

    alert("Todo title is empty");
}

/**
 * 
 * @param {SubmitEvent} event 
 */
function onSearchTodos(event) {
    event.preventDefault();

    state.searchQuery = document.getElementById("search-pending-todos-input").value;

    search();
}

/**
 * 
 * @param {Event} event 
 */
function onChangeSortOption(event) {
    event.preventDefault();
    state.sortOption = event.target.value;

    renderTodos();
}

/**
 * 
 * @param {DragEvent} event 
 * @param {string} zoneId 
 */
async function onDropCard(event, zoneId) {
    event.preventDefault();

    const id = event.dataTransfer.getData("text/plain");

    try {
        for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id == id) {
                const updatedStatus = zoneId === "pending" ? "pending" : "done";

                await updateTodoStatus(state.todos[i], updatedStatus);

                state.todos[i].status = updatedStatus;
                break;
            }
        }

        renderTodos();
    } catch (error) {
        console.error(error);
    }
}
