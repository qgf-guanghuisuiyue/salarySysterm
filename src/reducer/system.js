import {
    PARAMETER_LIST_START,
    PARAMETER_LIST_DONE,
    GET_PARAMETER_LIST
} from '../constants/system';

const initialState = {
    parameter: {
        isLoading: false,
        list: [],
    }
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case PARAMETER_LIST_START: 
            return {...state, parameter: {...state.parameter, isLoading: true}};
        case PARAMETER_LIST_DONE: 
            return {...state, parameter: {...state.parameter, isLoading: false}};
        case GET_PARAMETER_LIST: 
            return {...state, parameter: {...state.parameter, list: actions.list}}; 
        default: 
            return state;
    }
} 