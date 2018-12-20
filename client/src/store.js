import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk, logger];

export default function configureStore() {
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
