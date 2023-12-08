import React, { useState, useEffect } from "react";
import './Todo.css';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const Todoapp = () => {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => response.json())
      .then(data => {
        const todos = data.map(item => ({
          title: item.title,
          completed: item.completed
        }));
        setTodo(todos);
      })
      .catch(error => {
        console.error(error);
      });
  },[]);

  const handleChange = e => {
    setData(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    if (data === "" || data.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    if (editIndex === -1) {
      setTodo([...todo, { title: data, completed: false }]);
    } else {
      const newTodo = [...todo];
      newTodo[editIndex] = { title: data, completed: newTodo[editIndex].completed };
      setTodo(newTodo);
      setEditIndex(-1);
    }
    setData("");
  };

  const deleteHandler = indexValue => {
    const newTodo = todo.filter((_, index) => index !== indexValue);
    setTodo(newTodo);
    if (editIndex === indexValue) {
      setEditIndex(-1);
    }
  };

  const editHandler = indexValue => {
    setData(todo[indexValue].title);
    setEditIndex(indexValue);
  };

  const toggleComplete = indexValue => {
    const newTodo = [...todo];
    newTodo[indexValue] = {
      ...newTodo[indexValue],
      completed: !newTodo[indexValue].completed
    };
    setTodo(newTodo);
  };

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
  };

  const filteredTodo = filter === "completed" ? todo.filter(item => item.completed) : todo;

  return (
    <div>
      <div>
        <div className="todo">
          <h1 className="title">TODO LIST</h1>
          <form className="todo-form">
            <input className='todo-input' type="text" name="task" value={data} onChange={handleChange} />
            <button name="Add" onClick={handleClick} className="todo-button">Add</button>
            {/* <div className="filter-buttons"> */}
            <button type="button" onClick={() => handleFilterChange("all")} className={filter === "all" ? "active" : ""}>
            All
           </button>
          <button type="button" onClick={() => handleFilterChange("completed")} className={filter === "completed" ? "active" : ""}>
         Completed
         </button>

          {/* </div> */}
            {filteredTodo.map((todo, index) => (
              <div key={index} className={`todo-row ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
                  <span className="todo-id">{index + 1}. </span>{todo.title}
                </span>
                <div className="icons">
                  <FaRegEdit onClick={() => editHandler(index)} className="edit-icon" />
                  <MdDelete onClick={() => deleteHandler(index)} className="delete-icon" />
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Todoapp;
