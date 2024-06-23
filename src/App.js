import React, { useState } from "react";
import Form from "./components/Form";
import TodoHero from "./components/TodoHero";
import TodoList from "./components/TodoList";
import './App.css'

function App() {

  const [todos, setTodos] = useState([]);


  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      console.log(storedTodos)
    }
  }, []);

  const todos_completed = todos.filter(
    (todo) => todo.is_completed === true
  ).length;
  const total_todos = todos.length;

  return (
    <>
      <div className="wrapper">
        <TodoHero todos_completed={todos_completed} total_todos={total_todos} />
        <Form todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;