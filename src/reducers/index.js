import {combineReducers} from 'redux';
import LocationReducer from './reducer_location';


const rootReducer = combineReducers({
    comments: LocationReducer
});

export default rootReducer;