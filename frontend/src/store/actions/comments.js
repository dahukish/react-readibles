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