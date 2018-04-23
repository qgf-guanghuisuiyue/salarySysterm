import {
    APPLY_LIST_START,
    APPLY_LIST_DONE,
    GET_APPLY_LIST,
} from '../constants/apply';

const initialState = {
    applyList: {
        isLoading: false,
        list: []
    }
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case APPLY_LIST_START: 
            return {...state, applyList: {...state.applyList, isLoading: true}};
        case APPLY_LIST_DONE: 
            return {...state, applyList: {...state.applyList, isLoading: false}};
        case GET_APPLY_LIST: 
            return {...state, applyList: {...state.applyList, list: actions.list}}; 
        default: 
            return state;
    }
} 