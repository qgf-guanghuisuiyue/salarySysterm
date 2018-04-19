import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL,
    UPLOAD_FILE_START,
    UPLOAD_FILE_DONE
} from '../constants/upload';

const initialState = {
    upLoadModal: {
        visiable: false,
        isLoading: false,
    }
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case SHOW_FILE_MODAL: 
            return {...state, upLoadModal: {...state.upLoadModal, visiable: true}};
        case HIDE_FILE_MODAL: 
            return {...state, upLoadModal: {...state.upLoadModal, visiable: false}};
        case UPLOAD_FILE_START: 
            return {...state, upLoadModal: {...state.upLoadModal, isLoading: true}}; 
        case UPLOAD_FILE_DONE: 
            return {...state, upLoadModal: {...state.upLoadModal, isLoading: false}}; 
        default: 
            return state;
    }
} 