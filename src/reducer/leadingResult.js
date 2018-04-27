import {
    SHOW_LEADINGFILE_MODAL,
    HIDE_LEADINGFILE_MODAL
} from '../constants/leadingResult';

const initialState = {
    isLeadingFileModal:false
};

export default function leadingResult(state = initialState,actions){
    switch(actions.type){
        case SHOW_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:true}; 
        case HIDE_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:false};    
        default: 
            return state;
    }
} 