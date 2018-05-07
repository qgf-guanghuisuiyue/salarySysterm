import {
    REMOVE_UPLOAD_FILE
} from '../constants/file';

const initialState = {

}

export default function file(state = initialState,actions){
    switch(actions.type){
        case REMOVE_UPLOAD_FILE: 
            return {...state};
        default: 
            return state;
    }
}