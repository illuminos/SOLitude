import {combineReducers} from 'redux';
import LocationReducer from './reducer_location';
import DataReducer from './reducer_data';


const rootReducer = combineReducers({
    location: LocationReducer,
    data: DataReducer,
});

export default rootReducer;