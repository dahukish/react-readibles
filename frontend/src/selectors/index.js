import { createSelector } from 'reselect';
import { sortBy } from '../utils/helpers';

const commentsFilter = (comments, currentPost) => {
    return comments.filter(comment => comment.parentId === currentPost.id).length || 0;
}

const postsSelector = state => state.postsReducer.posts;

const postsSelectorByCategory = (state, props) =>
    state.postsReducer.posts.filter(post => post.category === props.match.params.category);

const commentsSelector = state => state.commentsReducer.comments;

const getSortSate = state => state.applicationReducer;

export const getPostsWithCommentCount = createSelector(
    postsSelector,
    commentsSelector,
    getSortSate,
    (posts, comments, sortState) => {
        const _posts = posts.map(post => {
            return {
                ...post,
                commentCount: commentsFilter(comments, post)
            };
        });
        return _posts.sort(sortBy(sortState.sortPostType, sortState.sortPostOrder));
    }
);

export const getPostsForCategoryWithCommentCount = createSelector(
    postsSelectorByCategory,
    commentsSelector,
    getSortSate,
    (posts, comments, sortState) => {
        const _posts = posts.map(post => {
            return {
                ...post,
                commentCount: commentsFilter(comments, post)
            };
        });
        return _posts.sort(sortBy(sortState.sortPostType, sortState.sortPostOrder));
    }
);

export const getCategories = (state) => state.categoriesReducer.categories;

export const getPostSortState = createSelector(
    getSortSate,
    (sortState) => {
        return {
            togglePostTypeUIState: sortState.togglePostTypeUIState,
            togglePostOrderUIState: sortState.togglePostOrderUIState,
            modalOpen: sortState.modalOpen,
            sortPostType: sortState.sortPostType,
            sortPostOrder: sortState.sortPostOrder
        };
    }
);

export const getCurrentPost = (state) => state.postsReducer.currentPost;