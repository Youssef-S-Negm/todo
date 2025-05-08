import { addTodo, getAllTodos, updateTodoStatus } from "../firebase/todo.service.js";
import Todo from "../model/todo.model.js";
import state from "../state.js";
import renderTodos from "../utils/render.js";
import search from "../utils/search.js";
import isValidInput from "../utils/validation.js";

export function setUpAddTodoForm() {
    document.getElementById("add-todo-form").onsubmit = async function (e) {
        e.preventDefault();

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

        alert("Todo title is empty")
    }
}

export function setUpSearchForm() {
    document.getElementById("search-pending-todos-form").onsubmit = function (e) {
        e.preventDefault();

        state.searchQuery = document.getElementById("search-pending-todos-input").value;

        search();
    }
}

export function setUpSortActions() {
    const selectSort = document.getElementById("sort-option")

    selectSort.onchange = function (event) {
        event.preventDefault();
        state.sortOption = event.target.value;

        renderTodos();
    }

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

    zone.addEventListener("drop", async e => {
        e.preventDefault();

        const id = e.dataTransfer.getData("text/plain");

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
    });
}
