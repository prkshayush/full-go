import './App.css'
import { Navbar } from './components/Navbar'
import { TodoForm } from './components/TodoForm'
import Todos from './components/Todos'

function App() {

  return (
    <div className="h-[100vh]">
      <Navbar />
      <h2 className="text-3xl font-bold text-center ">React + Go todo application</h2>
      <div className="flex items-center justify-between gap-10 p-8">
        <Todos />
        <TodoForm />
      </div>
    </div>
  )
}

export default App
