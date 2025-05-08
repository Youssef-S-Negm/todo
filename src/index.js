import { getAllTodos$ } from "./firebase/todo.service.js";
import Todo from "./model/todo.model.js";
import { setUpAddTodoForm, setupDropZone, setUpSearchForm, setUpSortActions } from "./setup/formsSetup.js";
import state from "./state.js";
import renderTodos from "./utils/render.js";

setUpAddTodoForm();
setUpSearchForm();
setUpSortActions();

setupDropZone("pending");
setupDropZone("completed");

document.addEventListener("DOMContentLoaded", onStart)

function onStart() {
    getAllTodos$().subscribe({
        next: snapshot => {
            snapshot.forEach(doc => {
                state.todos.push(Todo.toInstance({ ...doc.data(), id: doc.id }))
            })
            renderTodos();
        },
        error: error => {
            console.error("Failed to update document: ", error);
            alert("Fetching todos faild. Please try again.")
        }
    })
}
