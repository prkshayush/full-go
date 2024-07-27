import { useState } from "react";

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
      return (
        <div className="px-8 pt-4 text-lg border rounded-md h-fit">
          {todos.length > 0 ? (
            <ul className="text-left">
              {todos.map((todo, index) => (
                <li key={index} className="border-b py-2">
                  {todo.body} - {todo.completed ? "Completed" : "Not completed"}
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