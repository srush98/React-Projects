import React, { useState } from "react";
import "./ToDo.css";

const ToDo = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newList = {
        id: new Date().getTime(),
        task: inputValue,
        done: false,
      };
      setList([...list, newList]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    const updateList = list.filter((item) => item.id !== id);
    setList(updateList);
  };

  const editTask = (id, title) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(title);
  };

  const updateTask = () => {
    const updateList = list.map((item) =>
      item.id === editId ? { ...item, task: editValue } : item
    );
    setList(updateList);
    setEditMode(false);
    setEditId(null);
    setEditValue("");
  };

  const taskComplete = (id) => {
    const updateList = list.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setList(updateList);
  };

  return (
    <div className="container">
      <h1> To Do List</h1>
      <div className="input-button-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {editMode ? (
          <div>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />

            <button onClick={updateTask}>Update</button>
          </div>
        ) : (
          <button onClick={addTask}>Add</button>
        )}
      </div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div className="task-container">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => taskComplete(item.id)}
              />
              {item.task}
              <div className="action-buttons">
                <button onClick={() => editTask(item.id, item.task)}>
                  Update
                </button>
                <button onClick={() => deleteTask(item.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
