import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setVisibilityFilter,
  startEditing,
  finishEditing,
  updateTodoText,
} from '../store/todoActions';

import './TodoApp.css'; // Import the CSS file

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const visibilityFilter = useSelector((state) => state.todos.visibilityFilter);
  const editingTodoId = useSelector((state) => state.todos.editingTodoId);
  const [newTodo, setNewTodo] = useState('');
  const [inputWarning, setInputWarning] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      setInputWarning(true);
      return;
    }

    if (editingTodoId !== null) {
      dispatch(updateTodoText(editingTodoId, newTodo));
      dispatch(finishEditing());
    } else {
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));
    }

    setNewTodo('');
    setInputWarning(false);
  };

  const handleToggleTodo = (id, completed) => {
    dispatch(toggleTodo(id));
    if (completed && editingTodoId === id) {
      dispatch(finishEditing());
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    if (editingTodoId === id) {
      dispatch(finishEditing());
    }
  };

  const handleFilterChange = (filter) => {
    dispatch(setVisibilityFilter(filter));
  };

  const handleStartEditing = (id, text) => {
    dispatch(startEditing(id));
    setNewTodo(text);
  };

  const filteredTodos = () => {
    switch (visibilityFilter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'not-completed':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List Components</h1>
      <div className="input-container">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleAddTodo} >
          {editingTodoId !== null ? 'Save Todo' : 'Add Todo'}
        </button>
      </div>
      {inputWarning && <p className="warning-message">Please enter a valid todo.</p>}
      <div className="filter-container">
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={visibilityFilter === 'all'}
            onChange={() => handleFilterChange('all')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="completed"
            checked={visibilityFilter === 'completed'}
            onChange={() => handleFilterChange('completed')}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="not-completed"
            checked={visibilityFilter === 'not-completed'}
            onChange={() => handleFilterChange('not-completed')}
          />
          Not Completed
        </label>
      </div>
      <ul>
        {filteredTodos().map((todo) => (
          <li key={todo.id}>
            {/* <div className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
              />
            </div> */}
            <span className={`task-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            {editingTodoId === todo.id ? (
              <div className="edit-buttons">
                {/* <button onClick={handleFinishEditing}>Finish Editing</button> */}
              </div>
            ) : (
              <div className="edit-buttons">
                <button onClick={() => handleToggleTodo(todo.id, todo.completed)}>
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button
                  onClick={() =>
                    todo.completed
                      ? handleDeleteTodo(todo.id)
                      : handleStartEditing(todo.id, todo.text)
                  }
                >
                  {todo.completed ? 'Delete' : 'Edit'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;