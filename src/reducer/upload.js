import {
    SHOW_PAY_AGENT_COMMIT_MODAL,
    HIDE_PAY_AGENT_COMMIT_MODAL,
} from '../constants/upload';

const initialState = {
    isPayAgentCommitModalVisiable: false,
};

export default function upload(state = initialState,actions){
    switch(actions.type){
        case SHOW_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: true};
        case HIDE_PAY_AGENT_COMMIT_MODAL: 
            return {...state, isPayAgentCommitModalVisiable: false};
        default: 
            return state;
    }
} 