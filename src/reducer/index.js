import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';
import DataSwitch from './dataSwitch';
import LeadingResult from './leadingResult';

const rootReducer = combineReducers({
    DataSwitch,
    LeadingResult,
    Login,
    Home,
    DataSwitch
});

export default rootReducer;