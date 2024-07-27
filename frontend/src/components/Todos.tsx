import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Todo {
  _id: number;
  completed: boolean;
  body: string;
}

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        try {
          const response = await fetch("/api/todos");
          const data: Todo[] = await response.json();
    
          setTodos(data);
        } catch (error) {
          console.log(error)
        }
      }

      const markComplete = async (id: number) => {
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: true }),
          });
          if (response.ok) {
            setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: true } : todo)))
          }
        } catch (error) {
          console.log(error)
        }
      }

      const deleteTodo = async (id: number) => {
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setTodos(todos.filter(todo => todo._id !== id))
          }
        } catch (error) {
          console.log(error)
        }
      }

      return (
        <div className="px-8 pt-4 text-lg border rounded-md h-fit">
          {todos.length > 0 ? (
            <ul className="text-left">
              {todos.map((todo) => (
                <li key={todo._id} className="border-b py-2">
                  <span>{todo.body}</span>
                  <button onClick={() => markComplete(todo._id)} className={`mx-2 py-1 px-3 rounded-md ${todo.completed ? 'bg-gray-500' : 'bg-green-500'} text-white`}
                    disabled={todo.completed}>
                    {todo.completed ? "Completed" : "Mark as completed"}
                  </button>
                  <button onClick={() => deleteTodo(todo._id)} className="mx-2"><FaTrash /></button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No todos available</p>
          )}
          <button onClick={fetchTodos} className="bg-blue-700 text-slate-200 w-fit py-2 px-4 rounded-md my-2">All todos</button>
        </div>
      )
}

export default Todos;