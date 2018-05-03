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
    USERINFO_LIST_START,
    USERINFO_LIST_DONE,
    GET_USERINFO_LIST,
} from '../constants/system';

const initialState = {
    parameter: {
        isLoading: false,
        list: [],
    },
    saveParameterVisible: false,
    temp: {
        isLoading: false,
        list: [],
    },
    saveTempVisible: false,
    userInfoList: {
        isLoading: false,
        list: []
    },
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case PARAMETER_LIST_START: 
            return {...state, parameter: {...state.parameter, isLoading: true}};
        case PARAMETER_LIST_DONE: 
            return {...state, parameter: {...state.parameter, isLoading: false}};
        case GET_PARAMETER_LIST: 
            return {...state, parameter: {...state.parameter, list: actions.list}};
        case SHOW_SAVE_PARAMETER:
            return {...state, saveParameterVisible: true};
        case HIDE_SAVE_PARAMETER:
            return {...state, saveParameterVisible: false }
        case TEMP_LIST_START: 
            return {...state, temp: {...state.temp, isLoading: true}};
        case TEMP_LIST_DONE: 
            return {...state, temp: {...state.temp, isLoading: false}};
        case GET_TEMP_LIST: 
            return {...state, temp: {...state.temp, list: actions.list}}; 
        case SHOW_SAVE_TEMP:
            return {...state, saveTempVisible: true};
        case HIDE_SAVE_TEMP:
            return {...state, saveTempVisible: false }    
        case USERINFO_LIST_START: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: true}};
        case USERINFO_LIST_DONE: 
            return {...state, userInfoList: {...state.userInfoList, isLoading: false}};
        case GET_USERINFO_LIST: 
            return {...state, userInfoList: {...state.userInfoList, list: actions.list}};       
        default: 
            return state;
    }
} 