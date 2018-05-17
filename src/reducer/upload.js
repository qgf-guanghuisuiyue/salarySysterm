import {
    SHOW_PAY_AGENT_COMMIT_MODAL,
    HIDE_PAY_AGENT_COMMIT_MODAL,
    SHOW_PAY_AGENT_DEL_MODAL,
    HIDE_PAY_AGENT_DEL_MODAL,
    GET_FILENAMES,
} from '../constants/upload';

const initialState = {
    isPayAgentCommitModalVisiable: false,
    isPayAgentDelModalVisiable: false,
    fileNameData: {},
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case SHOW_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: true};
        case HIDE_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: false};
        case SHOW_PAY_AGENT_DEL_MODAL: 
            return {...state, isPayAgentDelModalVisiable: true};
        case HIDE_PAY_AGENT_DEL_MODAL: 
            return {...state, isPayAgentDelModalVisiable: false};    
        case GET_FILENAMES:
            return {...state, fileNameData: actions.fileNameData};
        default: 
            return state;
    }
} 