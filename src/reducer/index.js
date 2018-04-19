import {combineReducers} from 'redux';
import DataSwitch from './dataSwitch';
import LeadingResult from './leadingResult';

const rootReducer = combineReducers({
    DataSwitch,
    LeadingResult
});

export default rootReducer;