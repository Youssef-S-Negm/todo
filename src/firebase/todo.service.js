import Todo from "../model/todo.model.js";

const db = window.db;
const { collection, addDoc, getDocs, doc, updateDoc } = window.firebase;
const { from } = rxjs;

/**
 * 
 * @param {Todo} todo 
 */
export function addTodo$(todo) {
    return from(addDoc(collection(db, "todos"), todo.toJson()));
}

export function getAllTodos$() {    
    return from(getDocs(collection(db, "todos")));
}

/**
 * 
 * @param {Todo} todo 
 * @param {string} status
 */
export function updateTodoStatus$(todo, status) {
    const docRef = doc(db, "todos", todo.id);

    return from(updateDoc(docRef, {
        status
    }));
}

/**
 * 
 * @param {Todo} todo 
 * @param {number} priority 
 */
export function updateTodoPrioroty$(todo, priority) {
    const docRef = doc(db, "todos", todo.id);

    return from(updateDoc(docRef, {
        priority
    }));
}