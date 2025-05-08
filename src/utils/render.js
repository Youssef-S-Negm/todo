import createCard from "../components/todo.card.js";
import {
    SORT_OPTION_DATE_ASC,
    SORT_OPTION_DATE_DESC,
    SORT_OPTION_PRIORITY_ASC,
    SORT_OPTION_PRIORITY_DESC
} from "../constants/constants.js";
import { setUpSearchForm, setUpSortActions } from "../setup/formsSetup.js";
import state from "../state.js";
import search from "./search.js";

export default function renderTodos() {
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
    searchTodosInput.value = state.searchQuery;
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

    state.todos.sort((a, b) => {
        switch (state.sortOption) {
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

    state.todos.forEach(todo => {
        if (todo.status === "pending") {
            pendingTodos.appendChild(createCard(todo));
        } else {
            completedTodos.appendChild(createCard(todo));
        }
    })

    search();
}