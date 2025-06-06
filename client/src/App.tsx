import { useEffect, useState } from 'react';
import axios from "axios" 

interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(`http://localhost:5000/todos`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = { id: Date.now(), title };
    await axios.post(`http://localhost:5000/todos`, newTodo);
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, { completed });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  
return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100vh",
      width: "100vw",
      paddingTop: "10vh",
      backgroundColor: "#2e3440",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#3b4252",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        width: "fit-content",
        color: "#eceff4",
      }}
    >
      <h1 
        style={{  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1rem",
        colors: "#eceff4",
        fontSize: "1.8rem",
        fontWeight: "bold",
        lineHeight: "1.2",
        fontFamily: "monospace"
      }}
      >Tiny To-Do List</h1>
      <div style={{ 
        marginBottom: "1rem", 
        display: "flex", 
        gap: "0.5rem" 
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Enter a to-do..."
          style={{
            padding: "0.5rem",
            width: "250px",
            borderRadius: "4px",
            border: "1px solid #4c566a",
            backgroundColor: "#434c5e",
            color: "#eceff4",
            fontFamily: "monospace" 
            }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#88c0d0",
            color: "#2e3440",
            cursor: "pointer",
            fontWeight: "bold" 
            }}
        >
          ENTER
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem", width: "100%" }}>
        {todos.map((todo, index) => (
          <li 
            key={todo.id} 
            style={{ 
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "434c5e",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              color: "#eceff4",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
                <span>{index + 1}.</span>
                <input
                  type="checkbox"
                  checked={todo.completed || false}
                  onChange={() => toggleComplete(todo.id, !todo.completed)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#eceff4",
                  }}
                >
                  {todo.title}
                </span>
              </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "1rem",
                backgroundColor: "#bf616a",
                color: "#eceff4",
                border: "none",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              DEL
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
export default App;
