import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Form({todos, setTodos}) {

    const handleSubmit = (event) => {
        event.preventDefault()
        const value = event.target.todo.value;
        const newTodo = {
            title: value,
            id: uuidv4(),
            is_completed: false
        }
        setTodos((prevTodos) => [
            ...prevTodos,
            {title: value, id: uuidv4(), is_completed: false},
        ])
        const updatedTodoList = JSON.stringify([...todos, newTodo])
        localStorage.setItem("todos", updatedTodoList)
        event.target.reset();
    };

  return (
    <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="todo">
            <input
            type='text'
            name='todo'
            placeholder='Write your next task'
            />
        </label>
        <button className='submit'>
            <span>Submit</span>
        </button>
    </form>
  )
}