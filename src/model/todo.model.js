let id = 1;

class Todo {
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

export default Todo;
