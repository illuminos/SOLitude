import {FETCH_LOCATION,START_LOADER,FETCH_INSOLATION} from '../actions/index';


export default function(state={}, action){
    switch(action.type){
        case FETCH_LOCATION: return {...state, isLoading: false, latitude: action.payload.latitude, longitude: action.payload.longitude};
        case FETCH_INSOLATION:
            console.log(action.payload);
            return {...state, isLoading: false, latitude: action.payload.data.outputs.lat, longitude: action.payload.outputs.lon};
        case START_LOADER: return Object.assign({},state,{ isLoading: true});
        default: return state;
    }
}


// Object.assign({},state,{ isLoading: false, coords: action.payload});