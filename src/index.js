import { getAllTodos$ } from "./firebase/todo.service.js";
import Todo from "./model/todo.model.js";
import { setUpAddTodoForm, setupDropZone, setUpSearchForm, setUpSortActions } from "./setup/formsSetup.js";
import state from "./state.js";
import { renderSpinner, renderTodos } from "./utils/render.js";

setUpAddTodoForm();
setUpSearchForm();
setUpSortActions();

setupDropZone("pending");
setupDropZone("completed");

document.addEventListener("DOMContentLoaded", onStart)

function onStart() {
    state.isLoading = true;

    renderSpinner();
    getAllTodos$().subscribe({
        next: snapshot => {
            state.isLoading = false;

            snapshot.forEach(doc => {
                state.todos.push(Todo.toInstance({ ...doc.data(), id: doc.id }))
            })
            renderTodos();
            renderSpinner();
        },
        error: error => {
            state.isLoading = false;

            console.error("Failed to update document: ", error);
            alert("Fetching todos faild. Please try again.");
            renderSpinner();
        }
    })
}
