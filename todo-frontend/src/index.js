import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import todoReducer from './store/reducers/todo'

const rootReducer = combineReducers({
  todo: todoReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)
));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
