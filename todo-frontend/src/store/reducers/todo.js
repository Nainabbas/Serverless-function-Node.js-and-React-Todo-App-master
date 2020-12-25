import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  todos: null,
  error: null,
  loading: false,
  selectedTodo: null,
};

// Fetch todos
const fetchTodosStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, todos: null });
};

const fetchTodosSuccess = (state, action) => {
  return updateObject(state, {
    todos: action.todos,
    error: null,
    loading: false,
  });
};

const fetchTodosFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Add todo
const addTodoStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const addTodoSuccess = (state, action) => {
  return updateObject(state, {
    error: { message: "Todo added successfully" },
    loading: false,
  });
};

const addTodoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Edit todo
const editTodoStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const editTodoSuccess = (state, action) => {
  return updateObject(state, {
    error: { message: "Todo updated successfully" },
    loading: false,
  });
};

const editTodoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Delete todo
const deleteTodoSuccess = (state, action) => {
  const filteredTodos = state.todos.filter((todo) => todo.id !== action.id);
  return updateObject(state, {
    todos: filteredTodos,
    error: { message: "Todo deleted successfully" },
    loading: false,
  });
};

const deleteTodoFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

// Select todo
const selectTodo = (state, action) => {
  return updateObject(state, {
    selectedTodo: action.todo,
  });
};

const clearError = (state, action) => {
    return updateObject(state, {
      error: null
    })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Clear Error
    case actionTypes.CLEAR_ERROR:
      return clearError(state, action);

    // Fetch todos
    case actionTypes.FETCH_TODO_START:
      return fetchTodosStart(state, action);
    case actionTypes.FETCH_TODO_SUCCESS:
      return fetchTodosSuccess(state, action);
    case actionTypes.FETCH_TODO_FAIL:
      return fetchTodosFail(state, action);

    // Add todo
    case actionTypes.ADD_TODO_START:
      return addTodoStart(state, action);
    case actionTypes.ADD_TODO_SUCCESS:
      return addTodoSuccess(state, action);
    case actionTypes.ADD_TODO_FAIL:
      return addTodoFail(state, action);

    // Edit todo
    case actionTypes.EDIT_TODO_START:
      return editTodoStart(state, action);
    case actionTypes.EDIT_TODO_SUCCESS:
      return editTodoSuccess(state, action);
    case actionTypes.EDIT_TODO_FAIL:
      return editTodoFail(state, action);

    // Delete todo
    case actionTypes.DEL_TODO_SUCCESS:
      return deleteTodoSuccess(state, action);
    case actionTypes.DEL_TODO_FAIL:
      return deleteTodoFail(state, action);

    // Select todo
    case actionTypes.SELECT_TODO:
      return selectTodo(state, action);

    default:
      return state;
  }
};

export default reducer;
