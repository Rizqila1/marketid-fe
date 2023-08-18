import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReducerParams from "./modules/params";
import useReducerCarts from "./modules/cart";

const rootReducer = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  params: useReducerParams,
  carts: useReducerCarts,
});

export default createStore(rootReducer);
