import {
    SHOW_LEADINGFILE_MODAL,
    HIDE_LEADINGFILE_MODAL,
    ERROR_LIST_QUERY
} from '../constants/error';

const initialState = {
    isLeadingFileModal:false,
    errorList:[]
};

export default function leadingResult(state = initialState,actions){
    switch(actions.type){
        case SHOW_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:true}; 
        case HIDE_LEADINGFILE_MODAL: 
            return {...state,isLeadingFileModal:false};
        case ERROR_LIST_QUERY:
            return {...state,errorList: actions.errorList}    
        default: 
            return state;
    }
} 