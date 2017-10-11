import * as ActionTypes from '../actions/actionTypes';

export const initialComments = {
    comments: []
};

const commentsReducer = (state = initialComments, action) => {
    switch(action.type) {
        case ActionTypes.RECIEVE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        default:
            return state;
    }
};

export default commentsReducer;
