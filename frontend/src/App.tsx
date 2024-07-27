// import { useState } from 'react'
import './App.css'
import { Buttons } from './components/Buttons'
import { Navbar } from './components/Navbar'
import { TodoForm } from './components/TodoForm'
import Todos from './components/Todos'

// interface Todo {
//   _id: number,
//   completed: boolean,
//   body: string
// }

function App() {

  // const [todos, setTodos] = useState<Todo[]>([]);

  // const fetchTodos = async () => {
  //   try {
  //     const response = await fetch("/api/todos");
  //     const data: Todo[] = await response.json();

  //     setTodos(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="h-[100vh]">
      <Navbar />
      <h2 className="text-3xl font-bold text-center ">React + Go todo application</h2>
      <div className="flex items-center justify-between gap-10 p-8">
        {/* <div className="px-8 pt-4 text-lg border rounded-md h-fit">
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
        </div> */}
        <Todos />
        <TodoForm />
        <Buttons url='/api/todos/:id' text='Mark Complete' />
        <Buttons url='/api/todos/:id' text='Delete' />
      </div>
    </div>
  )
}

export default App
