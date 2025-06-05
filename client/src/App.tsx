import { useEffect, useState } from 'react';
import axios from "axios" 

interface Todo {
  id: number;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  cost addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = { id: Date.now(), title };
    await axios.post("https://localhost:5000/todos", newTodo);
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await axios.delete('http://localhost:5000/todos/${id}');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  
  return (
    <>
      <div>
	<input
	  value={title}
	  onChange={(e) => setTitle(e.target.value)}
	  placeholder="Add a todo..."
	  style={{ padding: "0.5rem", marginRight: "0.5rem" }}
	/>
	<button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
	{todos.map((todo) => (
	  {todo.title}
	  <button
	    onClick={() => deleteTodo(todo.id)}
	    style={{ marginLeft: "1rem" }}
	  >
	    x
	  </button>
	</li>
      ))}
    </ul>
  </div>
  );
}

export default App;
      </p>
    </>
  )
}

export default App
