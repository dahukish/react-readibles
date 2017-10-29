import * as ActionTypes from './actionTypes';

const toggleSortType = (currentToggleState) => ({
    type: ActionTypes.TOGGLE_POST_SORT_TYPE,
    currentToggleState
});

const toggleSortOrder = (currentToggleState) => ({
    type: ActionTypes.TOGGLE_POST_SORT_ORDER,
    currentToggleState
});

const modalState = (modalName, modalState) => ({
    type: ActionTypes.TOGGLE_MODAL_STATE,
    modalName,
    modalState
});

export const togglePostSortType = (currentToggleState) => dispatch => (
    dispatch(toggleSortType(currentToggleState))
);

export const togglePostSortOrder = (currentToggleState) => dispatch => (
    dispatch(toggleSortOrder(currentToggleState))
);

export const toggleModalState = (modalName, currentModalState) => dispatch => (
    dispatch(modalState(modalName, currentModalState))
);

export const updatePostFormMode = (formMode) => ({
    type: ActionTypes.SET_POST_FORM_MODE,
    formMode
});

export const setPostFormMode = (formMode) => dispatch => (
    dispatch(updatePostFormMode(formMode))
);

export const updateCommentFormMode = (formMode) => ({
    type: ActionTypes.SET_COMMENT_FORM_MODE,
    formMode
});

export const setCommentFormMode = (formMode) => dispatch => (
    dispatch(updateCommentFormMode(formMode))
);