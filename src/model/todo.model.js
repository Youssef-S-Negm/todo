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
        this.id = null;
        this.dateCreated = new Date();
        this.priority = TODO_IMPORTANCE_LOW;
    }

    toJson() {
        return {
            title: this.title,
            status: this.status,
            dateCreated: this.dateCreated,
            priority: this.priority,
        }
    }

    static toInstance({title, status, id, dateCreated, priority}) {
        const todo = new Todo(title);

        todo.status = status;
        todo.id = id;
        todo.dateCreated = dateCreated;
        todo.priority = priority;

        return todo;
    }
}
