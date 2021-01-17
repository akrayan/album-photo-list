import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { albumsReducer } from "./Reducer";

const middleware = [thunk];


const store = createStore(
    combineReducers({
     albums: albumsReducer
    }),
    applyMiddleware(...middleware));

export default store;