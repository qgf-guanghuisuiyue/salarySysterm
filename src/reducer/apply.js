import {
    APPLY_LIST_START,
    APPLY_LIST_DONE,
    GET_APPLY_LIST,
    DETAIL_LIST_START,
    DETAIL_LIST_DONE,
    SHOW_DETAIL_MODAL,
    HIDE_DETAIL_MODAL,
    GET_DETAIL_LIST,
    UPLOAD_START,
    UPLOAD_DONE,
    RESET_PAYAGENTDATA_TRUE,
    RESET_PAYAGENTDATA_FALSE,
} from '../constants/apply';

const initialState = {
    isUploadSucc: false,
    applyList: {
        isLoading: false,
        applyData: {}
    },
    detailList: {
        visible: false,
        isLoading: false,
        detailData: {}
    },
    destroyInvisibleModal: false,
    resetPayagent: false,
};

export default function apply(state = initialState,actions){
    switch(actions.type){
        case UPLOAD_START: 
            return {...state, isUploadSucc: false};
        case UPLOAD_DONE: 
            return {...state, isUploadSucc:actions.isUploadSucc};
        case APPLY_LIST_START: 
            return {...state, applyList: {...state.applyList, isLoading: true}};
        case APPLY_LIST_DONE: 
            return {...state, applyList: {...state.applyList, isLoading: false}};
        case GET_APPLY_LIST: 
            return {...state, applyList: {...state.applyList, applyData: actions.applyData}}; 
        case SHOW_DETAIL_MODAL: 
            return {...state, detailList: {...state.detailList, visible: true}, destroyInvisibleModal: false}; 
        case HIDE_DETAIL_MODAL: 
            return {...state, detailList: {...state.detailList, visible: false}, destroyInvisibleModal: true}; 
        case DETAIL_LIST_START: 
            return {...state, detailList: {...state.detailList, isLoading: true}}; 
        case DETAIL_LIST_DONE: 
            return {...state, detailList: {...state.detailList, isLoading: false}}; 
        case GET_DETAIL_LIST: 
            return {...state, detailList: {...state.detailList, detailData: actions.detailData}};  
        case RESET_PAYAGENTDATA_TRUE:
            return {...state, resetPayagent: true};
        case RESET_PAYAGENTDATA_FALSE:
            return {...state, resetPayagent: false};  
        default: 
            return state;
    }
} 