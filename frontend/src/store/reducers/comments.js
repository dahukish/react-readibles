import * as ActionTypes from '../actions/actionTypes';

export const initialComments = {
    comments: []
};

const commentsReducer = (state = initialComments, action) => {
    switch (action.type) {
        case ActionTypes.RECIEVE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case ActionTypes.CREATE_COMMENT:
            state.comments.push(action.newComment);
            return {
                ...state
            };
        case ActionTypes.DELETE_POST:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.parentId !== action.deletedPost.id)
            };
        case ActionTypes.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.deletedComment.id)
            };
        default:
            return state;
    }
};

export default commentsReducer;
