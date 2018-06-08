import {
    USER_LOGIN,
    USER_LOGOUT,
    LOGIN_START,
    LOGIN_DONE,
    SEND_SUCCESSFUL
} from '../constants/login';

const initialState = {
    loaddone: false,
    isLoading: false,
    msg:""
};

export default function login(state = initialState,actions){
    switch(actions.type){
        case LOGIN_START:
            return {...state,loaddone: true,msg:""};
        case LOGIN_DONE:
            return {...state,loaddone: false};
        case USER_LOGIN: 
            return {...state,token:actions.token};
        case USER_LOGOUT: 
            return {...state,token:actions.token};
        case SEND_SUCCESSFUL: 
            return {...state,msg:actions.msg};
        default: 
            return state;
    }
} 