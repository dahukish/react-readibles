import * as ActionTypes from './actionTypes';
import * as API from '../../utils/postsAPI';

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