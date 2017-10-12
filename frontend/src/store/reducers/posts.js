import * as ActionTypes from '../actions/actionTypes';

export const initialPosts = {
    posts: []
};

const postsReducer = (state = initialPosts, action) => {
    switch (action.type) {
        case ActionTypes.RECIEVE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case ActionTypes.RECIEVE_POST_VOTE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.updatedPost.id) {
                        post.voteScore = action.updatedPost.voteScore;
                    }
                    return post;
                })
            }
        case ActionTypes.RECIEVE_COMMENTS:
            return {
                ...state
            }
        case ActionTypes.SORT_POSTS:
            return {
                ...state
            }
        case ActionTypes.CREATE_POST:
            state.posts.push(action.newPost);
            return {
                ...state
            }
        case ActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.deletedPost.id)
            }
        default:
            return state;
    }
};

export default postsReducer;
