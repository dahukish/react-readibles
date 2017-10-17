import * as ActionTypes from './actionTypes';

const toggleSortType = (currentToggleState) => ({
    type: ActionTypes.TOGGLE_POST_SORT_TYPE,
    currentToggleState
});

const toggleSortOrder = (currentToggleState) => ({
    type: ActionTypes.TOGGLE_POST_SORT_ORDER,
    currentToggleState
});

const modalState = (modalState) => ({
    type: ActionTypes.TOGGLE_MODAL_STATE,
    modalState
});

export const togglePostSortType = (currentToggleState) => dispatch => (
    dispatch(toggleSortType(currentToggleState))
);

export const togglePostSortOrder = (currentToggleState) => dispatch => (
    dispatch(toggleSortOrder(currentToggleState))
);

export const toggleModalState = (currentModalState) => dispatch => (
    dispatch(modalState(currentModalState))
);

export const updatePostFormMode = (formMode) => ({
    type: ActionTypes.SET_POST_FORM_MODE,
    formMode
});

export const setPostFormMode = (formMode) => dispatch => (
    dispatch(updatePostFormMode(formMode))
);