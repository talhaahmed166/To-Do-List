import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import './style.css';

const ToDoList = () => {
  console.log('Talha');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  const handleComplete = (index) => {
    const now = new Date();
    const dd = now.getDate();
    const mm = now.getMonth() + 1;
    const yyyy = now.getFullYear();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;
    const filteredItem = {
      ...allTodos[index],
      completedOn
    };

    const updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      description: newDescription
    };
    const updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };
  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task Description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="Btn-area">
          <button
            className={`isCompleteScreen ${isCompleteScreen === false ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`isCompleteScreen ${isCompleteScreen === true ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false
            && allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} />
                  <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} />
                </div>
              </div>
            ))}

          {isCompleteScreen === true
            && completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <small>
                    Completed on:
                    {' '}
                    {item.completedOn}
                  </small>
                </p>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
