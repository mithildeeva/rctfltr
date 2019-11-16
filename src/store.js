
import {createStore} from "redux";
import createReducer from "./reducer";
import {initialState} from "./constants";

const configureStore = () => {
    return createStore(createReducer(), initialState);
};

export default configureStore;