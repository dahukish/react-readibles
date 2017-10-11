import * as ActionTypes from './actionTypes';
import * as API from '../../utils/categoryAPI';

export const recieveCategories = (categories) => ({
    type: ActionTypes.RECIEVE_CATEGORIES,
    categories
});

export const fetchCategories = () => dispatch => (
    API.getCategories()
    .then(categories => dispatch(recieveCategories(categories)))
);