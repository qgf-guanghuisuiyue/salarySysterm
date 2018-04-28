import {
    SHOW_FILE_MODAL,
    HIDE_FILE_MODAL,
    GET_DATASWITCH_LIST,
    HIDE_LOADING,
    SHOW_LOADING,
    DATA_SWITCH,
    PAYAGENT_DETAIL,
    HIDE_SWITCH_LOADING,
    SHOW_SWITCH_LOADING,
    DATA_RESULT_CHECK,
    CREATE_FILE_START,
    CREATE_FILE_DONE,
    SHOW_REFUSE_MODAL,
    HIDE_REFUSE_MODAL,
    SHOW_EDIT_MODAL,
    HIDE_EDIT_MODAL
} from '../constants/dataSwitch';

const initialState = {
    isFileModal:false,
    dataSwitchList:{},
    isLoading:false,
    fileInfo:{},
    payagentDetail:{},
    isSwitchLoading:false,
    resultData:{},
    createFileLoading:false,
    isRefuseModal:false,
    isEditModal:false,
    title:""
};

export default function dataSwitch(state = initialState,actions){
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
             return {...state,isSwitchLoading:false};
        case PAYAGENT_DETAIL: 
            return {...state,payagentDetail:actions.payagentDetail}; 
        case DATA_RESULT_CHECK: 
            return {...state,resultData:actions.resultData};
        case CREATE_FILE_START: 
            return {...state,createFileLoading:true};
        case CREATE_FILE_DONE: 
            return {...state,createFileLoading:false};
        case SHOW_REFUSE_MODAL: 
            return {...state,isRefuseModal:true}; 
        case HIDE_REFUSE_MODAL: 
            return {...state,isRefuseModal:false};
        case SHOW_EDIT_MODAL: 
            return {...state,isEditModal:true,title:actions.title}; 
        case HIDE_EDIT_MODAL: 
            return {...state,isEditModal:false};     
        default: 
            return state;
    }
} 