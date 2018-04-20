import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL,
    GET_DATASWITCH_LIST,
    HIDE_LOADING,
    SHOW_LOADING
} from '../constants/dataSwitch';

const initialState = {
    isFileModal:false,
    dataSwitchList:{},
    isLoading:false
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case SHOW_FILE_MODAL: 
            return {...state,isFileModal:true}; 
        case HIDE_FILE_MODAL: 
            return {...state,isFileModal:false};
        case GET_DATASWITCH_LIST: 
            return {...state,dataSwitchList:actions.dataSwitchList};
        case SHOW_LOADING: 
            return {...state,isLoading:true};
        case HIDE_LOADING: 
            return {...state,isLoading:false};    
        default: 
            return state;
    }
} 