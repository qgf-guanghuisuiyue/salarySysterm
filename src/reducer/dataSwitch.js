import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL,
    GET_DATASWITCH_LIST,
    HIDE_LOADING,
    SHOW_LOADING,
    DATA_SWITCH,
    PAYAGENT_DETAIL,
    HIDE_SWITCH_LOADING,
    SHOW_SWITCH_LOADING
} from '../constants/dataSwitch';

const initialState = {
    isFileModal:false,
    dataSwitchList:{},
    isLoading:false,
    fileInfo:{},
    payagentDetail:{},
    isSwitchLoading:false,
    switchSuccess:false
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
        case SHOW_SWITCH_LOADING: 
             return {...state,isSwitchLoading:true};
        case HIDE_SWITCH_LOADING: 
             return {...state,isSwitchLoading:false,switchSuccess:true};
        case PAYAGENT_DETAIL: 
            return {...state,payagentDetail:actions.payagentDetail};     
        default: 
            return state;
    }
} 