import * as ActionTypes from '../actions/actionTypes';
import { commentsFilter } from '../../utils/helpers';

export const initialPosts = {
    posts: [],
    currentPost: null,
    postsSortOrder: 'asc'
};

const postsReducer = (state = initialPosts, action) => {
    switch (action.type) {
        case ActionTypes.RECEIVE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case ActionTypes.RECEIVE_POST_VOTE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.updatedPost.id) {
                        post.voteScore = action.updatedPost.voteScore;
                    }
                    return post;
                })
            };
        case ActionTypes.RECEIVE_COMMENTS:
            const postsWithComments = state.posts.map(post => {
                return {
                    ...post,
                    commentCount: commentsFilter(action.comments, post)
                };
            });
            return {
                ...state,
                posts: postsWithComments
            };
        case ActionTypes.SORT_POSTS:
            return {
                ...state
            };
        case ActionTypes.CREATE_POST:
            action.newPost.commentCount = 0;
            const newPosts = state.posts.slice(0);
            newPosts.push(action.newPost);
            return {
                ...state,
                posts: newPosts
            };
        case ActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.updatedPost.id) {
                        post = action.updatedPost;
                    }
                    return post;
                })
            };
        case ActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.deletedPost.id)
            }
        case ActionTypes.SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.currentPost
            }
        case ActionTypes.CREATE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.newComment.parentId) {
                        post.commentCount++;
                    }
                    return post;
                })
            }
        case ActionTypes.DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.deletedComment.parentId) {
                        post.commentCount--;
                    }
                    return post;
                })
            }
        default:
            return state;
    }
};

export default postsReducer;
