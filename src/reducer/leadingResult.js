import {
    SHOW_LEADINGFILE_MODAL,
    HIDE_LEADINGFILE_MODAL,
    SHOW_UPLOAD_MODAL,
    HIDE_UPLOAD_MODAL,
    SHOW_DETAIL_MODAL,
    HIDE_DETAIL_MODAL,
    LEADING_RESULT_DETAIL
} from '../constants/leadingResult';

const initialState = {
    isLeadingFileModal:false,
    isUpLoadModal:false,
    isDetailModal:false,
    resultDetailList:{}
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
        case SHOW_DETAIL_MODAL: 
            return {...state,isDetailModal:true};
        case HIDE_DETAIL_MODAL: 
            return {...state,isDetailModal:false}; 
        case LEADING_RESULT_DETAIL:
            return {...state,resultDetailList:actions.resultDetailList}  
        default: 
            return state;
    }
} 