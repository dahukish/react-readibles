import * as ActionTypes from './actionTypes';
import * as API from '../../utils/postsAPI';
import { initialize, submit, reset } from 'redux-form';

export const sortPostsBy = (posts, sortBy, order) => ({
    type: ActionTypes.SORT_POSTS,
    posts,
    sortData: {
        sortBy,
        order
    }
});

export const changePostsSort = (posts, sortBy, order) => dispatch => (
    dispatch(sortPostsBy(posts, sortBy, order))
);

export const recievePosts = (posts) => ({
    type: ActionTypes.RECIEVE_POSTS,
    posts
});

export const fetchPosts = () => dispatch => (
    API.getPosts()
        .then(posts => dispatch(recievePosts(posts)))
);

export const recieveVoteForPost = (updatedPost) => ({
    type: ActionTypes.RECIEVE_POST_VOTE,
    updatedPost
});

export const voteForPost = (id, vote) => dispatch => (
    API.voteForPost(id, vote)
        .then(updatedPost => dispatch(recieveVoteForPost(updatedPost)))
);

export const addNewPost = (newPost) => ({
    type: ActionTypes.CREATE_POST,
    newPost
});

export const submitNewPostValues = (postValues) => dispatch => (
    API.createPost(postValues)
        .then(newPost => dispatch(addNewPost(newPost)))

);

export const updatePost = (updatedPost) => ({
    type: ActionTypes.UPDATE_POST,
    updatedPost
});

export const submitUpdatedPostValues = (id, postValues) => dispatch => (
    API.updatePost(id, postValues)
        .then(updatedPost => dispatch(updatePost(updatedPost)))

);

export const removeDeletedPost = (deletedPost) => ({
    type: ActionTypes.DELETE_POST,
    deletedPost
});

export const deletePost = (id) => dispatch => (
    API.deletePost(id)
        .then(deletedPost => dispatch(removeDeletedPost(deletedPost)))
);

export const updateCurrentPost = (currentPost) => ({
    type: ActionTypes.SET_CURRENT_POST,
    currentPost
});

export const setCurrentPost = (currentPost) => dispatch => {
    dispatch(updateCurrentPost(currentPost));
    dispatch(initialize('post_form', currentPost));
};

export const submitPostForm = ()=> dispatch => {
    dispatch(submit('post_form'));
};

export const resetPostForm = ()=> dispatch => {
    dispatch(reset('post_form'));
};