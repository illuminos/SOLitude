import {TOGGLE_DEVICE} from '../actions/index';


export default function(state={}, action){
    switch(action.type){
        case TOGGLE_DEVICE:
            return state.map( (item, id) => {
                if(id !== action.payload) {
                    return item;
                }
                return {...item,...{enabled: !item.enabled}};
            });
        default: return state;
    }
}