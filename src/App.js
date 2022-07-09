import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, postDeleteTodo } from "./todoSlice";

export default function App() {

  const todos = useSelector(state => state.todos.entities)
  const loading = useSelector(state => state.todos.loading)
  const erorrMessage = useSelector(state => state.todos.errorMessage)
  const dispatch = useDispatch();

  // after the app component first renders we need to go get the todos from the API
  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  const onDeleteClick = (idToDelete) => {
    // also make that change on the frontend
    dispatch(postDeleteTodo(idToDelete))
  }

  if(loading) {
    return <p>Loading...</p>
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
