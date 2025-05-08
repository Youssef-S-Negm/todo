import { getAllTodos } from "./firebase/todo.service.js";
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

async function onStart() {
    try {
        const snapshot = await getAllTodos();

        snapshot.forEach(doc => {
            state.todos.push(Todo.toInstance({ ...doc.data(), id: doc.id }))
        })

        renderTodos();
    } catch (error) {
        console.error(error);
    }
}
