import { TODO_IMPORTANCE_LOW } from "../constants/constants.js";

let id = 1;

export default class Todo {
    /**
     * 
     * @param {String} title 
     */
    constructor(title) {
        this.title = title;
        this.status = "pending"
        this.id = id++;
        this.dateCreated = new Date();
        this.priority = TODO_IMPORTANCE_LOW;
    }
}
