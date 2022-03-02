import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import allReducers from "./reducers/index";
import {persistStore, persistReducer} from 'redux-persist'
import storage from "redux-persist/es/storage";
import { PersistGate } from "redux-persist/integration/react";
import addFoodReducer from './reducers/AddFoodReducer';
import addZoneReducer from "./reducers/AddZoneReducer";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage
}

const allReducers = combineReducers({
  addedFood: persistReducer(persistConfig, addFoodReducer),
  addedZone: persistReducer(persistConfig, addZoneReducer)
});


const persistedReducer = persistReducer(persistConfig, allReducers)
// const composeEnhancers =
const store = createStore(
  persistedReducer,
  // addFoodReducer,
  // addZoneReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);

const persistedStore = persistStore(store)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={persistedStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
