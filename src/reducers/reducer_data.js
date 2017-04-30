import {ENABLE_DEVICE,FETCH_LOCATION,START_LOADER,FETCH_INSOLATION} from '../actions/index';


export default function(state={}, action){
    switch(action.type){
        case ENABLE_DEVICE:
            // console.log("state",state);
            // console.log("action",action);
            // console.log([...state, state[action.payload].enabled = !state[action.payload].enabled]);
            // return Object.assign({},state, !state[action.payload].enabled);
            return [...state, state[action.payload].enabled = !state[action.payload].enabled];
        default: return state;
    }
}


// Object.assign({},state,{ isLoading: false, coords: action.payload});


// !state.data[action.payload].enabled