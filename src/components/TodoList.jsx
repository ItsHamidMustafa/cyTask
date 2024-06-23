import React, { useState, useEffect } from 'react'

function TodoList({ todos, setTodos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} todos={todos} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  )
}

function Item({ item, todos, setTodos }) {
  console.log(todos)
  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
    console.log(item.is_completed)
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  }


  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  }

  const inputRef = React.useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };

  const handleInputBlur = () => {
    setEditing(false);
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };

  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  }


  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <div className="todo_items_left">
            <input className="form-check-input" ref={inputRef} type="checkbox" checked={item.is_completed} onChange={completeTodo} role="switch" id="flexSwitchCheckChecked" />

            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          </div>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span>Edit</span>
            </button>
            <button onClick={handleDelete}>
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}


export default TodoList;