import { useEffect, useState } from "react";

const fetchAllTodos = async () => {
  // fetch the todos from the backend
  const response = await fetch("/data/todos");
  // unsquish them and return them
  const data = await response.json();
  // return the array of todos
  return data.todos;
}

const deleteTodo = async (idToDelete) => {
  // fetch the todos from the backend
  const response = await fetch("/data/todos/" + idToDelete, { method: "DELETE" });
  return response.ok
}

export default function App() {
  const [todos, setTodos] = useState( [] );

  // after the app component first renders we need to go get the todos from the API
  useEffect(() => {
    const refreshTodos = async () => {
      const allTodos = await fetchAllTodos();
      setTodos(allTodos);
    }
    refreshTodos();
  }, [])

  const onDeleteClick = (idToDelete) => {
    // tell the backend that we deleted something
    //const itWorked = await deleteTodo(idToDelete);
    deleteTodo(idToDelete);
    // also make that change on the frontend
    setTodos(todos => todos.filter(todo => todo.id !== idToDelete))
  }

  return (
    <div>
      <ul>
        { todos.map(todo => (
          <li key={todo.id}>
            { todo.text }{" "}
            <button onClick={() => onDeleteClick(todo.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
