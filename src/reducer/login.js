import {
    USER_LOGIN,
    USER_LOGOUT,
    LOGIN_START,
    LOGIN_DONE
} from '../constants/login';

const initialState = {
    // token: {},
    isLoading: false
};

export default function login(state = initialState,actions){
    switch(actions.type){
        case LOGIN_START:
            return {...state,loaddone: false};
        case LOGIN_DONE:
            return {...state,loaddone: true};
        case USER_LOGIN: 
            return {...state,token:actions.token};
        case USER_LOGOUT: 
            return {...state,token:actions.token};
        default: 
            return state;
    }
} 