import * as actionTypes from "./actionTypes";
import axios from "axios";

const url = "http://localhost:3000/dev/todo";

export const clearErrorAction = () => {
    return {
      type: actionTypes.CLEAR_ERROR,
    };
};


export const clearError = () => {
  return (dispatch) => { 
    setTimeout( () => {
      dispatch(clearErrorAction())
    }, 10000)
  }
};

// Fetching Todo
const fetchTodoStart = () => {
  return {
    type: actionTypes.FETCH_TODO_START,
  };
};

export const fetchTodoSuccess = (todos) => {
  return {
    type: actionTypes.FETCH_TODO_SUCCESS,
    todos: todos,
  };
};

export const fetchTodoFail = (error) => {
  return {
    type: actionTypes.FETCH_TODO_FAIL,
    error: error,
  };
};

export const fetchTodo = () => {
  return (dispatch) => {
    dispatch(fetchTodoStart());
    axios
      .get(url)
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchTodoSuccess(res.data));
        } else {
          dispatch(fetchTodoFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchTodoFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchTodoFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchTodoFail({ message: "Something went wrong" }));
        }
      });
  };
};

// Adding Todo

const addTodoStart = () => {
  return {
    type: actionTypes.ADD_TODO_START,
  };
};

export const addTodoSuccess = (todo) => {
  return {
    type: actionTypes.ADD_TODO_SUCCESS,
    todo: todo,
  };
};

export const addTodoFail = (error) => {
  return {
    type: actionTypes.ADD_TODO_FAIL,
    error: error,
  };
};

export const addTodo = (todo, history) => {
  return (dispatch) => {
    dispatch(addTodoStart());
    axios
      .post(url, todo)
      .then((res) => {
        history.push("todos");
        dispatch(addTodoSuccess(res.data));
        dispatch(clearError())
      })
      .catch((err) => {
        history.push("todos");
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(addTodoFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(addTodoFail(err.request.data));
        } else {
          // anything else
          dispatch(addTodoFail({ message: "Something went wrong" }));
        }
        dispatch(clearError())
      });
  };
};

// Delete Todo
export const deleteTodoFail = (error) => {
  return {
    type: actionTypes.DEL_TODO_FAIL,
    error: error,
  };
};

export const deleteTodoSuccess = (id) => {
  return {
    type: actionTypes.DEL_TODO_SUCCESS,
    id: id,
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/${id}`)
      .then((res) => {
        if (res && res.data) {
          dispatch(deleteTodoSuccess(id));
        }
        dispatch(clearError())
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(deleteTodoFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(deleteTodoFail(err.request.data));
        } else {
          // anything else
          dispatch(deleteTodoFail({ message: "Something went wrong" }));
        }
        dispatch(clearError())
      });
  };
};

// Editing Todo

const editTodoStart = () => {
  return {
    type: actionTypes.EDIT_TODO_START,
  };
};

export const editTodoSuccess = (todo) => {
  return {
    type: actionTypes.EDIT_TODO_SUCCESS,
    todo: todo,
  };
};

export const editTodoFail = (error) => {
  return {
    type: actionTypes.EDIT_TODO_FAIL,
    error: error,
  };
};

export const editTodo = (todo, id, history) => {
  return (dispatch) => {
    dispatch(editTodoStart());
    axios
      .put(`${url}/${id}`, todo)
      .then((res) => {
        history.push("todos")
        dispatch(editTodoSuccess(res.data));
        dispatch(clearError())
      })
      .catch((err) => {
        history.push("todos")
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(editTodoFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(editTodoFail(err.request.data));
        } else {
          // anything else
          dispatch(editTodoFail({ message: "Something went wrong" }));
          dispatch(clearError())
        }
        dispatch(clearError())
      });
  };
};

//  Select todo
export const selectTodo = (todo) => {
  return {
    type: actionTypes.SELECT_TODO,
    todo: todo,
  };
};