import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { createReucer } from './creator';
import quizReducer from './quiz';

export default combineReducers({
    quiz: quizReducer,
    creator: createReucer,
    auth: authReducer,
});
