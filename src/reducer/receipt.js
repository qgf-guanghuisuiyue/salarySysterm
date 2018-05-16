import {
    RECEIPT_QUERY_LIST,
    SHOW_RECEIPT_MODAL,
    HIDE_RECEIPT_MODAL,
    COMPANY_LIST,
    RATEANDEARN_LIST,
    CALCULATE,
    CALCULATE_START
} from '../constants/receipt';

const initialState = {
    receiptList:{},
    isReceiptModal:false,
    companyList:{},
    rateAndEarnList:{},
    calculateList:{},
    isCalLoading:false
}

export default function receipt(state = initialState,actions){
    switch(actions.type){
        case RECEIPT_QUERY_LIST: 
            return {...state,receiptList:actions.receiptList};
        case SHOW_RECEIPT_MODAL: 
            return {...state,isReceiptModal:true};
        case HIDE_RECEIPT_MODAL: 
            return {...state,isReceiptModal:false,calculateList:{}};
        case COMPANY_LIST: 
            return {...state,companyList:actions.companyList}; 
        case RATEANDEARN_LIST: 
            return {...state,rateAndEarnList:actions.rateAndEarnList};
        case CALCULATE: 
            return {...state,calculateList:actions.calculateList,isCalLoading:false};  
        case CALCULATE_START:
            return {...state,isCalLoading:true}
        default: 
            return state;
    }
}