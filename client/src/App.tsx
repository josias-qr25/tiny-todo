import { useEffect, useState } from 'react';
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  
  const [hackerMode, setHackerMode] = useState(false);

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

/*DISPLAY PAGE*/
return (
  <div
    style={{
      /*PAGE DESIGN*/
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100vh",
      width: "100vw",
      paddingTop: "10vh",
      backgroundColor: hackerMode ? "#121212" : "#2e3440",
      color: hackerMode ? "#eeeeee" : "#eceff4",
    }}
  >
    <div
      style={{
        /*CARD DESIGN*/
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: hackerMode ? "#232427" : "#3b4252",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        width: "fit-content",
        color: hackerMode ? "#a6e3a1" : "#eceff4",
      }}
    >
      <h1 
        /*TITLE DESIGN*/
        style={{  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "1rem",
        color: hackerMode ? "#a6e3a1" : "#eceff4",
        fontSize: "1.8rem",
        fontWeight: "bold",
        lineHeight: "1.2",
        fontFamily: "monospace"
      }}
      /*TITLE TEXT*/
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
          /*INPUT BOX DESIGN*/
          placeholder="Enter a to-do..."
          style={{
            padding: "0.5rem",
            width: "250px",
            borderRadius: "4px",
            border: hackerMode ? "1px solid #a6e3a1" : "1px solid #4c566a",
            backgroundColor: hackerMode ? "#111" : "#434c5e",
            color: hackerMode ? "#a6e3a1" : "#eceff4",
            fontFamily: "monospace" 
            }}
        />
        <button
          /*ENTER BUTTON DESIGN*/
          onClick={addTodo}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: hackerMode ? "1px solid #a6e3a1" : "none",
            backgroundColor: hackerMode ? "transparent" : "#88c0d0",
            color: hackerMode ? "#a6e3a1" : "#2e3440",
            cursor: "pointer",
            fontWeight: "bold" 
            }}
        >
          ENTER
        </button>
      </div>
      <ul
      /*TODOS LIST DESIGN*/ 
      style={{ listStyle: "none", padding: 0, marginTop: "1rem", width: "100%" }}>
        {todos.map((todo, index) => (
          <li 
            key={`${todo.id}-${hackerMode}`}
            style={{ 
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: hackerMode ? "#111" : "#434c5e",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              color: hackerMode ? "#a6e3a1" : "#eceff4",
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
                    color: todo.completed ? (hackerMode ? "#a6e3a1" : "#888") : (hackerMode ? "#a6e3a1" : "#eceff4"),
                  }}
                >
                  {todo.title}
                </span>
              </div>
            <button
              /*DELETE BUTTON DESIGN*/
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "1rem",
                backgroundColor: hackerMode ? "transparent" : "#bf616a",
                color: hackerMode ? "#a6e3a1" : "#eceff4",
                border: hackerMode ? "1px solid #a6e3a1" : "none",
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
   <button

     onClick={() => setHackerMode(!hackerMode)}
     style={{
      /*THEME TOGGLE DESIGN*/
      position: "absolute",
      top: "1rem",
      right: "1rem",
      padding: "0.4rem 0.8rem",
      fontSize: "0.8rem",
      borderRadius: "0.5rem",
      backgroundColor: hackerMode ? "#3b4252" : "#1f2329",
      color: hackerMode ? "#a6e3a1" : "#a6e3a1",
      border: "none",
      cursor: "pointer",
      zIndex: 1000,
      fontFamily: "monospace",
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease"
      }}
    >
      {hackerMode ? "Nord Mode" : "Hacker Mode"}
    </button>
  </div>
);
}
export default App;
