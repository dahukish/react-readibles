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
        case ActionTypes.CREATE_COMMENT:
            state.comments.push(action.newComment);
            return {
                ...state
            }
        default:
            return state;
    }
};

export default commentsReducer;
