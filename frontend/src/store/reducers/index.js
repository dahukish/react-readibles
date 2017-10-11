import { combineReducers } from 'redux';
import applicationReducer from './application';
import postsReducer from './posts';
import categoriesReducer from './categories';
import commentsReducer from './comments';

export default combineReducers({
    applicationReducer,
    postsReducer,
    categoriesReducer,
    commentsReducer
});
