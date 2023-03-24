import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { calcReducer } from "./reducers/calcReducer/calcReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  calc: calcReducer,
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk
      //loggerMiddleware,
    )
    //composeWithDevTools() // DevTools
  )
);
