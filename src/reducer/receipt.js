import {
    RECEIPT_QUERY_LIST,
    SHOW_RECEIPT_MODAL,
    HIDE_RECEIPT_MODAL
} from '../constants/receipt';

const initialState = {
    receiptList:{},
    isReceiptModal:false
}

export default function receipt(state = initialState,actions){
    switch(actions.type){
        case RECEIPT_QUERY_LIST: 
            return {...state,receiptList:actions.receiptList};
        case SHOW_RECEIPT_MODAL: 
            return {...state,isReceiptModal:true};
        case HIDE_RECEIPT_MODAL: 
            return {...state,isReceiptModal:false};
        default: 
            return state;
    }
}