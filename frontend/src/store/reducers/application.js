import * as ActionTypes from '../actions/actionTypes';

export const initialApplicationState = {
    sortPostType: 'voteScore',
    sortPostOrder: 'asc',
    sortCommentType: 'voteScore',
    sortCommentOrder: 'asc',
    togglePostTypeUIState: false,
    togglePostOrderUIState: true,
    modalOpen: false,
    postFormMode: 'create'
};

const applicationReducer = (state = initialApplicationState, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_POST_SORT_TYPE:
            return {
                ...state,
                togglePostTypeUIState: action.currentToggleState,
                sortPostType: (action.currentToggleState === true) ? 'timestamp' : 'voteScore'
            }
        case ActionTypes.TOGGLE_POST_SORT_ORDER:
            return {
                ...state,
                togglePostOrderUIState: action.currentToggleState,
                sortPostOrder: (action.currentToggleState === true) ? 'asc' : 'desc'
            }
        case ActionTypes.TOGGLE_MODAL_STATE:
            return {
                ...state,
                modalOpen: action.modalState
            }
        case ActionTypes.SET_POST_FORM_MODE:
            return {
                ...state,
                postFormMode: action.formMode
            }
        default:
            return state;
    }
};

export default applicationReducer;
