import {TOGGLE_DEVICE,UPDATE_TABLE} from '../actions/index';


export default function(state={}, action){
    switch(action.type){
        case TOGGLE_DEVICE:
            return state.map( (item, id) => {
                if(id !== action.payload) {
                    return item;
                }
                return {...item,...{enabled: !item.enabled}};
            });
        case UPDATE_TABLE:
            let item = {...action.payload,
                id: state.length+1,
                average_cost: "$"+ action.payload.average_cost,
                average_time_spent: parseInt(action.payload.average_time_spent)
            };
            return [item,...state];
        default: return state;
    }
}