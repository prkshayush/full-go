import {useState, FormEvent} from 'react'

interface Todo {
    _id: number,
    completed: boolean,
    body: string
  }  

export const TodoForm = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: newTodo }),
            });
            const data: Todo = await response.json();
            setTodos([...todos, data]);
            setNewTodo("");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Create new task" className="px-2 py-4 border rounded-md m-4 w-52 h-36 text-center" />
            <button type="submit" className="bg-blue-700 text-slate-200 w-fit py-2 px-4 rounded-md my-2">Add task</button>
        </form>
    )
}
