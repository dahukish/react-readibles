import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import applicationReducer from './application';
import postsReducer from './posts';
import categoriesReducer from './categories';
import commentsReducer from './comments';

export default combineReducers({
    router: routerReducer,
    form: reduxFormReducer,
    applicationReducer,
    postsReducer,
    categoriesReducer,
    commentsReducer
});
