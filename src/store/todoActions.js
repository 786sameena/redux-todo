// src/actions/todoActions.js
export const addTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo,
});

// src/actions/todoActions.js
export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: filter,
});


export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: id,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: id,
});



// src/actions/todoActions.js
export const startEditing = (id) => ({
  type: 'START_EDITING',
  payload: id,
});

export const finishEditing = () => ({
  type: 'FINISH_EDITING',
});


// ... (other actions)
// src/actions/todoActions.js
// ... (other actions)

export const updateTodoText = (id, newText) => ({
  type: 'UPDATE_TODO_TEXT',
  payload: { id, newText },
});


