import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL
} from '../constants/dataSwitch';

const initialState = {
    isFileModal:false
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case SHOW_FILE_MODAL: 
            return {...state,isFileModal:true}; 
        case HIDE_FILE_MODAL: 
            return {...state,isFileModal:false};    
        default: 
            return state;
    }
} 