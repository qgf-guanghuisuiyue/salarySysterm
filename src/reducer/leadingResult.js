import {
    SHOW_LEADINGFILE_MODAL,
    HIDE_LEADINGFILE_MODAL,
    SHOW_UPLOAD_MODAL,
    HIDE_UPLOAD_MODAL
} from '../constants/leadingResult';

const initialState = {
    isLeadingFileModal:false,
    isUpLoadModal:false
};

export default function leadingResult(state = initialState,actions){
    switch(actions.type){
        case SHOW_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:true}; 
        case HIDE_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:false};
        case SHOW_UPLOAD_MODAL: 
            return {...state,isUpLoadModal:true};
        case HIDE_UPLOAD_MODAL: 
            return {...state,isUpLoadModal:false};    
        default: 
            return state;
    }
} 