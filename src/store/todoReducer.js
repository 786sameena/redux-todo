const initialState = {
  todos: [],
  visibilityFilter: 'all',
  editingTodoId: null, // Ensure this is set to null initially
};

  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };

        case 'SET_VISIBILITY_FILTER':
            return {
              ...state,
              visibilityFilter: action.payload,
            };  

            case 'START_EDITING':
      return {
        ...state,
        editingTodoId: action.payload,
      };

    case 'FINISH_EDITING':
      return {
        ...state,
        editingTodoId: null,
      };  

      case 'UPDATE_TODO_TEXT':
  return {
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
    ),
  };

      default:
        return state;
    }
  };
  
  export default todoReducer;
  