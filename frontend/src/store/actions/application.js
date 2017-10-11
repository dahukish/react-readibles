import * as ActionTypes from './actionTypes';

const toggleSortType = (currentToggleState)=> ({
    type: ActionTypes.TOGGLE_POST_SORT_TYPE,
    currentToggleState
});

const toggleSortOrder = (currentToggleState)=> ({
    type: ActionTypes.TOGGLE_POST_SORT_ORDER,
    currentToggleState
});

export const togglePostSortType = (currentToggleState) => dispatch => (
    dispatch(toggleSortType(currentToggleState))
);

export const togglePostSortOrder = (currentToggleState) => dispatch => (
    dispatch(toggleSortOrder(currentToggleState))
);

