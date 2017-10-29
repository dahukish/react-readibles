import { createSelector } from 'reselect';
import { sortBy } from '../utils/helpers';

const postsSelector = state => state.postsReducer.posts;

const postsSelectorByCategory = (state, props) =>
    state.postsReducer.posts.filter(post => post.category === props.match.params.category);

const commentsSelector = state => state.commentsReducer.comments;

export const getApplicationSate = state => state.applicationReducer;

export const getPostsSorted = (state, props) => {
    let posts;
    if (props && props.match) {
        posts = postsSelectorByCategory(state, props);
    } else {
        posts = postsSelector(state);
    }
    const uiState = getApplicationSate(state);
    const sortedPosts = posts.sort(sortBy(uiState.sortPostType, uiState.sortPostOrder));

    return new Array(...sortedPosts);
};

export const getPostsForCategorySorted = createSelector(
    postsSelectorByCategory,
    getApplicationSate,
    (posts, uiState) => {
        return posts.sort(sortBy(uiState.sortPostType, uiState.sortPostOrder));
    }
);

export const getCategories = (state) => state.categoriesReducer.categories;

export const getCurrentPostFromState = (state) => state.postsReducer.currentPost;


export const getCurrentPostFromParams = (state, props) =>
    state.postsReducer.posts
        .filter(post => post.category === props.match.params.category)
        .filter(filteredPost => filteredPost.id === props.match.params.id)[0];

export const getViewPost = (state, props) => {
    const post = getCurrentPostFromParams(state, props);
    return post;
};

export const getViewPostComments = (state, props) => {
    const post = getCurrentPostFromParams(state, props);
    const ui = getApplicationSate(state);
    return commentsSelector(state).filter(comment => comment.parentId === post.id).sort(sortBy(ui.sortCommentType, ui.sortCommentOrder));
};

export const getPostFormMode = (state) => state.applicationReducer.postFormMode;
export const getLocation = (state) => state.router.location;