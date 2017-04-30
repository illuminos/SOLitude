import {FETCH_LOCATION,START_LOADER} from '../actions/index';


export default function(state={}, action){
    switch(action.type){
        case FETCH_LOCATION: return {...state, isLoading: false, coords: action.payload};
        case START_LOADER: return Object.assign({},state,{ isLoading: true});
        default: return state;
    }

}


// Object.assign({},state,{ isLoading: false, coords: action.payload});