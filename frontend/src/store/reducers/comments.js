import * as ActionTypes from '../actions/actionTypes';

export const initialComments = {
    comments: []
};

const commentsReducer = (state = initialComments, action) => {
    switch (action.type) {
        case ActionTypes.RECEIVE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case ActionTypes.CREATE_COMMENT:
            const newComments = state.comments.slice(0);
            newComments.push(action.newComment);
            return {
                ...state,
                comments: newComments
            };
        case ActionTypes.RECEIVE_COMMENT_VOTE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.updatedComment.id) {
                        comment.voteScore = action.updatedComment.voteScore;
                    }
                    return comment;
                })
            };
        case ActionTypes.UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.updatedComment.id) {
                        return action.updatedComment;
                    } else {
                        return comment;
                    }
                })
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
