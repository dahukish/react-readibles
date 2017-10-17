import { createSelector } from 'reselect';
import { sortBy } from '../utils/helpers';

const postsSelector = state => state.postsReducer.posts;

const postsSelectorByCategory = (state, props) =>
    state.postsReducer.posts.filter(post => post.category === props.match.params.category);

const commentsSelector = state => state.commentsReducer.comments;

const getApplicationSate = state => state.applicationReducer;

export const getPostsSorted = createSelector(
    postsSelector,
    getApplicationSate,
    (posts, uiState) => {
        return posts.sort(sortBy(uiState.sortPostType, uiState.sortPostOrder));
    }
);

export const getPostsForCategorySorted = createSelector(
    postsSelectorByCategory,
    getApplicationSate,
    (posts, uiState) => {
        return posts.sort(sortBy(uiState.sortPostType, uiState.sortPostOrder));
    }
);

export const getCategories = (state) => state.categoriesReducer.categories;

export const getUIState = createSelector(
    getApplicationSate,
    (sortState) => {
        return {
            togglePostTypeUIState: sortState.togglePostTypeUIState,
            togglePostOrderUIState: sortState.togglePostOrderUIState,
            modalOpen: sortState.modalOpen,
            sortPostType: sortState.sortPostType,
            sortPostOrder: sortState.sortPostOrder,
            postFormMode: sortState.postFormMode
        };
    }
);

export const getCurrentPostFromState = (state) => state.postsReducer.currentPost;


export const getCurrentPostFromParams = (state, props) =>
    state.postsReducer.posts
        .filter(post => post.category === props.match.params.category)
        .filter(filteredPost => filteredPost.id === props.match.params.id);

export const getViewPost = createSelector(
    getCurrentPostFromParams,
    (posts) => {
        return posts[0];
    }
);

export const getViewPostComments = (state, props) => {
    const post = getCurrentPostFromParams(state, props)[0];
    return commentsSelector(state).filter(comment => comment.parentId === post.id);
};

export const getPostFormMode = (state) => state.applicationReducer.postFormMode;

export const getLocation = (state) => state.router.location;