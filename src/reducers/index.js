import {combineReducers} from 'redux';
import LocationReducer from './reducer_location';
import DataReducer from './reducer_data';
// import BatteryReducer from './reducer_battery';

const rootReducer = combineReducers({
    location: LocationReducer,
    data: DataReducer,
    // battery: BatteryReducer
});

export default rootReducer;