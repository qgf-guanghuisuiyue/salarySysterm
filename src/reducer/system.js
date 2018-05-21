import {
    PARAMETER_LIST_START,
    PARAMETER_LIST_DONE,
    GET_PARAMETER_LIST,
    SHOW_SAVE_PARAMETER,
    HIDE_SAVE_PARAMETER,
    TEMP_LIST_START,
    TEMP_LIST_DONE,
    GET_TEMP_LIST,
    LOG_LIST,
    LOG_LIST_START,
    LOG_LIST_DONE,
    ROLE_LIST,
    SHOW_SAVE_TEMP,
    HIDE_SAVE_TEMP,
    SET_RESETTEMP_TRUE,
    SET_RESETTEMP_FALSE,
    RESET_TEMPSTATUS_TRUE,
    RESET_TEMPSTATUS_FALSE,
    GET_CORP_LIST,
    USERINFO_LIST_START,
    USERINFO_LIST_DONE,
    GET_USERINFO_LIST,
    SHOW_ADDACCESS_MODAL,
    HIDE_ADDACCESS_MODAL,
    SHOW_SAVE_USERINFO,
    HIDE_SAVE_USERINFO,
    SET_RESETUSERINFO_TRUE,
    SET_RESETUSERINFO_FALSE,
    SET_RELOADPWD_FALSE,
    SHOW_RELOADPWD,
    HIDE_RELOADPWD,
    SET_RELOADPWD_TRUE
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
    isStatusStop: false,
    userInfoList: {
        isLoading: false,
        userInfoData: []
    },
    isAddAccessModal:false,
    saveUserInfoModal: {
        saveUserInfoVisible: false,
        resetForm: false        
    },
    reloadPwdModal: {
        reloadPwdVisible: false,
        resetForm: false,
    },
    logList:{},
    roleList:{}
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
            return {...state, saveParameterVisible: false };
        case TEMP_LIST_START: 
            return {...state, temp: {...state.temp, isLoading: true}};
        case TEMP_LIST_DONE: 
            return {...state, temp: {...state.temp, isLoading: false}};
        case GET_TEMP_LIST: 
            return {...state, temp: {...state.temp, tempData: actions.tempData}};
        case LOG_LIST: 
            return {...state, logList: actions.logList};
        case LOG_LIST_START: 
            return {...state, isLogLoading: true};
        case LOG_LIST_DONE: 
            return {...state, isLogLoading: false};
        case ROLE_LIST:
            return {...state, roleList: actions.roleList};     
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
        case RESET_TEMPSTATUS_TRUE: 
            return {...state, isStatusStop: true };  
        case RESET_TEMPSTATUS_FALSE:
            return {...state, isStatusStop: false };       
        case USERINFO_LIST_START: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: true}};
        case USERINFO_LIST_DONE: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: false}};
        case GET_USERINFO_LIST: 
            return {...state, userInfoList: {...state.userInfoList, userInfoData: actions.userInfoData}};
        case SHOW_ADDACCESS_MODAL: 
            return {...state, isAddAccessModal: true};
        case HIDE_ADDACCESS_MODAL: 
            return {...state, isAddAccessModal: false};       
        case SHOW_SAVE_USERINFO:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, saveUserInfoVisible: true}};
        case HIDE_SAVE_USERINFO:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, saveUserInfoVisible: false}};  
        case SET_RESETUSERINFO_TRUE:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, resetForm: true}};
        case SET_RESETUSERINFO_FALSE:
            return {...state, saveUserInfoModal: {...state.saveUserInfoModal, resetForm: false}};  
        case SHOW_RELOADPWD:
            return {...state, reloadPwdModal: {...state.reloadPwdModal, reloadPwdVisible: true}};
        case HIDE_RELOADPWD:
            return {...state, reloadPwdModal: {...state.reloadPwdModal, reloadPwdVisible: false}};  
        case SET_RELOADPWD_TRUE:
            return {...state, reloadPwdModal: {...state.reloadPwdModal, resetForm: true}};
        case SET_RELOADPWD_FALSE:
            return {...state, reloadPwdModal: {...state.reloadPwdModal, resetForm: false}};                
        default: 
            return state;
    }
} 