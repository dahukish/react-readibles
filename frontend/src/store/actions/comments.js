import * as ActionTypes from './actionTypes';
import * as API from '../../utils/commentsAPI';
import { submit, reset } from 'redux-form';

export const recieveAllComments = (comments) => ({
    type: ActionTypes.RECIEVE_COMMENTS,
    comments
});

export const fetchAllComments = (postIDs) => dispatch => (
    API.getAllComments(postIDs)
    .then(comments => dispatch(recieveAllComments(comments)))
);

export const addNewComment = (newComment) => ({
    type: ActionTypes.CREATE_COMMENT,
    newComment
});

export const submitNewCommentValues = (commentValues) => dispatch => {
    console.log('commentValues', commentValues)
    API.addComment(commentValues)
        .then(newComment => dispatch(addNewComment(newComment)))
};

export const submitCommentForm = ()=> dispatch => {
    dispatch(submit('comment_form'));
};

export const resetCommentForm = ()=> dispatch => {
    dispatch(reset('comment_form'));
};

export const updateComment = (updatedComment) => ({
    type: ActionTypes.UPDATE_COMMENT,
    updatedComment
});

export const submitUpdatedCommentValues = (id, commentValues) => dispatch => (
    API.updateComment(id, commentValues)
        .then(updatedComment => dispatch(updateComment(updatedComment)))

);

export const removeDeletedComment = (deletedComment) => ({
    type: ActionTypes.DELETE_COMMENT,
    deletedComment
});

export const deleteComment = (id) => dispatch => (
    API.deleteComment(id)
        .then(deletedComment => dispatch(removeDeletedComment(deletedComment)))
);