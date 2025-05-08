import state from "../state.js";
import isValidInput from "./validation.js";

export default function search() {
    if (isValidInput(state.searchQuery)) {
        filterCards(state.searchQuery);
        return;
    }

    makeAllCardsVisible();
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

function makeAllCardsVisible() {
    const todosContainer = document.getElementById("pending-todos");
    const cards = todosContainer.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "";
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
