import {combineReducers} from 'redux';
import Home from './home';
import Login from './login';
import Upload from './upload';
import Apply from './apply';
import DataSwitch from './dataSwitch';
import LeadingResult from './leadingResult';
import System from './system';

const rootReducer = combineReducers({
    DataSwitch,
    LeadingResult,
    Login,
    Home,
    Upload,
    Apply,
    DataSwitch,
    System
});

export default rootReducer;