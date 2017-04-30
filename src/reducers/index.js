import {combineReducers} from 'redux';
import LocationReducer from './reducer_location';

const rootReducer = combineReducers({
    location: LocationReducer,
});

export default rootReducer;