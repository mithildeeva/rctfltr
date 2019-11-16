import {combineReducers} from "redux";
import * as reducers from 'reducers/index';

const createReducer = () => {
    return combineReducers(reducers);
};

export default createReducer;