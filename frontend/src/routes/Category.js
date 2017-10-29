import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import uuidv4 from 'uuid/v4';
import * as Actions from '../store/actions';
import {
    getApplicationSate
} from '../selectors';
import PostList from '../components/PostList';
import PostForm from '../forms/post';

const Category = (props) => {
    return (
        <div className="posts-list">
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton
                        label='Back'
                        onClick={() => {
                            props.actions.push('/');
                        }} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <Toggle
                        label="Sort By Date (Default is Vote Score)"
                        defaultToggled={false}
                        onToggle={() => {
                            const newToggleState = !props.ui.togglePostTypeUIState;
                            const newSortType = (newToggleState === true) ? 'timestamp' : 'voteScore';
                            props.actions.togglePostSortType(newToggleState);
                            props.actions.changePostsSort(newSortType, props.ui.sortPostOrder);
                        }}
                        labelPosition="right"
                        style={{ margin: 20 }}
                    />
                    <Toggle
                        label="Sort Asc (Default is Desc)"
                        defaultToggled={true}
                        onToggle={() => {
                            const newToggleState = !props.ui.togglePostOrderUIState;
                            const newOrder = (newToggleState === true) ? 'asc' : 'desc';
                            props.actions.togglePostSortOrder(newToggleState);
                            props.actions.changePostsSort(props.ui.sortPostType, newOrder);
                        }}
                        labelPosition="right"
                        style={{ margin: 20 }}
                    />
                </ToolbarGroup>
            </Toolbar>
            <PostList match={props.match} />
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
        </div>
    );
};

Category.propTypes = {
    match: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
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
)(Category);
