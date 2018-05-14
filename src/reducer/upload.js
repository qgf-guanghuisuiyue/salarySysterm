import {
    SHOW_PAY_AGENT_COMMIT_MODAL,
    HIDE_PAY_AGENT_COMMIT_MODAL,
    GET_FILENAMES,
} from '../constants/upload';

const initialState = {
    isPayAgentCommitModalVisiable: false,
    fileNameData: {},
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case SHOW_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: true};
        case HIDE_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: false};
        case GET_FILENAMES:
            return {...state, fileNameData: actions.fileNameData};
        default: 
            return state;
    }
} 