import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL,
    UPLOAD_FILE_START,
    UPLOAD_FILE_DONE
} from '../constants/upload';

const initialState = {
    upLoadModal: {
        visiable: false,
    },
    isFileLoading: false
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case SHOW_FILE_MODAL: 
            return {...state, upLoadModal: {...state.upLoadModal, visiable: true}};
        case HIDE_FILE_MODAL: 
            return {...state, upLoadModal: {...state.upLoadModal, visiable: false}};
        case UPLOAD_FILE_START: 
            return {...state, isFileLoading: true}; 
        case UPLOAD_FILE_DONE: 
            return {...state, isFileLoading: false}; 
        default: 
            return state;
    }
} 