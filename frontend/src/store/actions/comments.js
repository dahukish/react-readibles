import * as ActionTypes from './actionTypes';
import * as API from '../../utils/commentsAPI';

export const recieveAllComments = (comments) => ({
    type: ActionTypes.RECIEVE_COMMENTS,
    comments
});

export const fetchAllComments = (postIDs) => dispatch => (
    API.getAllComments(postIDs)
    .then(comments => dispatch(recieveAllComments(comments)))
);