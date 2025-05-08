import { SORT_OPTION_DATE_ASC } from "./constants/constants.js";
import Todo from "./model/todo.model.js";

const state = {
    /**
    * @type {Todo[]}
    */
    todos: [],
    searchQuery: "",
    sortOption: SORT_OPTION_DATE_ASC
}

export default state;