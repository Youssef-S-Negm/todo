import Todo from "../model/todo.model.js";

const db = window.db;
const { collection, addDoc, getDocs, doc, updateDoc } = window.firebase;

/**
 * 
 * @param {Todo} todo 
 */
export async function addTodo(todo) {
    return await addDoc(collection(db, "todos"), todo.toJson());
}

export async function getAllTodos() {
    return await getDocs(collection(db, "todos"));
}

/**
 * 
 * @param {Todo} todo 
 * @param {string} status
 */
export async function updateTodoStatus(todo, status) {
    const docRef = doc(db, "todos", todo.id);

    return await updateDoc(docRef, {
        ...todo.toJson(),
        status
    });
}

/**
 * 
 * @param {Todo} todo 
 * @param {number} priority 
 */
export async function updateTodoPrioroty(todo, priority) {
    const docRef = doc(db, "todos", todo.id);

    return await updateDoc(docRef, {
        ...todo.toJson(),
        priority
    });
}