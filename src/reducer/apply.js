import {
    APPLY_LIST_START,
    APPLY_LIST_DONE,
    GET_APPLY_LIST,
} from '../constants/apply';

const initialState = {
    isLoading: false,
    apply_list: []
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case APPLY_LIST_START: 
            return {...state, isLoading: true};
        case APPLY_LIST_DONE: 
            return {...state, isLoading: false};
        case GET_APPLY_LIST: 
            return {...state, apply_list: actions.apply_list}; 
        default: 
            return state;
    }
} 