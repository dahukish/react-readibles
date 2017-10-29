import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import uuidv4 from 'uuid/v4';
import * as Actions from '../store/actions';
import {
    getApplicationSate
} from '../selectors';
import PostForm from '../forms/post';

const PostActions = (props) => {
    return (
        <Dialog
            open={props.ui.modals.post}
            actions={[
                <FlatButton
                    key={'cancelButton'}
                    label="Cancel"
                    primary={true}
                    onClick={() => {
                        props.actions.resetPostForm();
                        props.actions.toggleModalState('post', false);
                    }}
                />,
                <FlatButton
                    key={'submitButton'}
                    label="Submit"
                    primary={true}
                    onClick={() => {
                        props.actions.submitPostForm();
                        props.actions.toggleModalState('post', false);
                    }}
                />,
            ]}
        >
            <PostForm onSubmit={(values) => {
                if (props.ui.postFormMode === 'create') {
                    const newPost = {
                        id: uuidv4(),
                        timestamp: Date.now(),
                        voteScore: 1,
                        ...values
                    };
                    props.actions.submitNewPostValues(newPost).then(() => {
                        props.actions.setCurrentPost(null);
                        props.actions.toggleModalState('post', false);
                    });
                } else {
                    const updatedPost = {
                        timestamp: Date.now(),
                        ...values
                    };
                    props.actions.submitUpdatedPostValues(values.id, updatedPost).then(() => {
                        props.actions.setCurrentPost(null);
                        props.actions.toggleModalState('post', false);
                    });
                }

            }} />
        </Dialog>
    );
};

PostActions.propTypes = {
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        ui: getApplicationSate(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions.default, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostActions);
