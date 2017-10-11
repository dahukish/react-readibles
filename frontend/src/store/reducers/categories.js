import * as ActionTypes from '../actions/actionTypes';

export const initialCategories = {
    categories: []
};

const categoryReducer = (state = initialCategories, action) => {
    switch(action.type) {
        case ActionTypes.RECIEVE_CATEGORIES:
            return {
                ...state,
                ...action.categories
            };
        default:
            return state;
    }
};

export default categoryReducer;
