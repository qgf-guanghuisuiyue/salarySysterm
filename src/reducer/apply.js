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
    UPLOAD_DONE
} from '../constants/apply';

const initialState = {
    isUploadSucc: false,
    applyList: {
        isLoading: false,
        list: []
    },
    detailListModal: {
        visible: false,
        isLoading: false,
        list: []
    }
};

export default function upload(state = initialState,actions){
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
            return {...state, applyList: {...state.applyList, list: actions.list}}; 
        case SHOW_DETAIL_MODAL: 
            return {...state, detailListModal: {...state.detailListModal, visible: true}}; 
        case HIDE_DETAIL_MODAL: 
            return {...state, detailListModal: {...state.detailListModal, visible: false}}; 
        case DETAIL_LIST_START: 
            return {...state, detailListModal: {...state.detailListModal, isLoading: true}}; 
        case DETAIL_LIST_DONE: 
            return {...state, detailListModal: {...state.detailListModal, isLoading: false}}; 
        case GET_DETAIL_LIST: 
            return {...state, detailListModal: {...state.detailListModal, list: actions.list}}; 
        default: 
            return state;
    }
} 