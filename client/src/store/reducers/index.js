import {combineReducers} from 'redux';
import verify from './verify_reducer';

const appReducers = combineReducers({
    verify
});

export default appReducers;