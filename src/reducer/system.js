import {
    PARAMETER_LIST_START,
    PARAMETER_LIST_DONE,
    GET_PARAMETER_LIST,
    SHOW_SAVE_PARAMETER,
    HIDE_SAVE_PARAMETER,
    TEMP_LIST_START,
    TEMP_LIST_DONE,
    GET_TEMP_LIST,
    SHOW_SAVE_TEMP,
    HIDE_SAVE_TEMP,
    SET_RESETTEMP_TRUE,
    SET_RESETTEMP_FALSE,
    GET_CORP_LIST,
    USERINFO_LIST_START,
    USERINFO_LIST_DONE,
    GET_USERINFO_LIST,
    SHOW_SAVE_USERINFO,
    HIDE_SAVE_USERINFO,
    SET_RESETUSERINFO_TRUE,
    SET_RESETUSERINFO_FALSE
} from '../constants/system';

const initialState = {
    parameter: {
        isLoading: false,
        parameterData: [],
    },
    saveParameterVisible: false,
    temp: {
        isLoading: false,
        tempData: [],
    },
    corpData: {},
    saveTempModal: {
        saveTempVisible: false,
        resetForm: false
    },
    userInfoList: {
        isLoading: false,
        userInfoData: []
    },
    saveUserInfoModal: {
        saveUserInfoVisible: false,
        resetForm: false        
    }
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case PARAMETER_LIST_START: 
            return {...state, parameter: {...state.parameter, isLoading: true}};
        case PARAMETER_LIST_DONE: 
            return {...state, parameter: {...state.parameter, isLoading: false}};
        case GET_PARAMETER_LIST: 
            return {...state, parameter: {...state.parameter, parameterData: actions.parameterData}};
        case SHOW_SAVE_PARAMETER:
            return {...state, saveParameterVisible: true};
        case HIDE_SAVE_PARAMETER:
            return {...state, saveParameterVisible: false }
        case TEMP_LIST_START: 
            return {...state, temp: {...state.temp, isLoading: true}};
        case TEMP_LIST_DONE: 
            return {...state, temp: {...state.temp, isLoading: false}};
        case GET_TEMP_LIST: 
            return {...state, temp: {...state.temp, tempData: actions.tempData}}; 
        case SHOW_SAVE_TEMP:
            return {...state, saveTempModal:{...state.saveTempModal,saveTempVisible: true}};
        case HIDE_SAVE_TEMP:
            return {...state, saveTempModal:{...state.saveTempModal,saveTempVisible: false}};
        case SET_RESETTEMP_TRUE:
            return {...state, saveTempModal:{...state.saveTempModal,resetForm: true}};
        case SET_RESETTEMP_FALSE:
            return {...state, saveTempModal:{...state.saveTempModal,resetForm: false}};    
        case GET_CORP_LIST:  
            return {...state, corpData: actions.corpData };  
        case USERINFO_LIST_START: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: true}};
        case USERINFO_LIST_DONE: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: false}};
        case GET_USERINFO_LIST: 
            return {...state, userInfoList: {...state.userInfoList, userInfoData: actions.userInfoData}};   
        case SHOW_SAVE_USERINFO:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, saveUserInfoVisible: true}};
        case HIDE_SAVE_USERINFO:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, saveUserInfoVisible: false}};  
        case SET_RESETUSERINFO_TRUE:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, resetForm: true}};
        case SET_RESETUSERINFO_FALSE:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, resetForm: false}};             
        default: 
            return state;
    }
} 