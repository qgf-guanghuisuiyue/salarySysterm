import {
    NEWS_LIST,
    SCROLLTO,
    CANCELLISTINDEX,
    GETPATH,
    GETPAGE,
    CANCELCURRENTPAGE
} from '../constants/home';

const initialState = {
    photolist: [], 
    num:0,
    artilcle:false,
    page:1
};

export default function home(state = initialState,actions){
    switch(actions.type){
        case NEWS_LIST: 
            return {...state,photolist:actions.photolist};
        case SCROLLTO: 
            return {...state,num:actions.num,page:actions.page};
        case CANCELLISTINDEX: 
            return {...state,article:false}; 
        case GETPATH: 
            return {...state,article:true}; 
        case GETPAGE: 
            return {...state,page:actions.page};
        case CANCELCURRENTPAGE: 
            return {...state,page:1};     
        default: 
            return state;
    }
} 