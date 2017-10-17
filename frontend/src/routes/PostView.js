import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import uuidv4 from 'uuid/v4';
import * as Actions from '../store/actions';
import {
    getViewPost,
    getViewPostComments,
    getUIState
} from '../selectors';
import CommentForm from '../forms/comment';


const PostView = (props) => {
    const { post, comments } = props;
    return (
        <div>
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <RaisedButton label="Go Back" primary={true} onClick={() => {
                        props.actions.push('/');
                    }} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton label="Add New Comment" primary={true} onClick={() => {
                        // props.actions.setPostFormMode('create');
                        props.actions.toggleModalState(true);
                    }} />
                </ToolbarGroup>
            </Toolbar>

            {
                post && (
                    <Card key={post.id}>
                        <CardHeader
                            title={post.title}
                            subtitle={post.author}
                        >
                            <div>{post.category}</div>
                        </CardHeader>
                        <div>Vote Score: {post.voteScore}</div>
                    </Card>
                )
            }
            <div>Comments:</div>
            {
                comments &&
                (
                    <List>
                        {
                            comments.map(comment => (
                                <ListItem key={comment.id} primaryText={comment.author}>
                                    <p>{comment.body}</p>
                                </ListItem>
                            ))
                        }
                    </List>
                )
            }
            <Dialog
                open={props.ui.modalOpen}
                actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => {
                            props.actions.resetCommentForm();
                            props.actions.toggleModalState(false);
                        }}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={() => {
                            props.actions.submitCommentForm();
                            props.actions.toggleModalState(false);
                        }}
                    />,
                ]}
            >
                <CommentForm onSubmit={(values) => {
                    // if (props.ui.postFormMode === 'create') {
                    const newComment = {
                        id: uuidv4(),
                        timestamp: Date.now(),
                        parentId: post.id,
                        ...values
                    };
                    props.actions.submitNewCommentValues(newComment);
                    // } else {
                    // const updatedPost = {
                    //     timestamp: Date.now(),
                    //     ...values
                    // };
                    // props.actions.submitUpdatedPostValues(values.id, updatedPost).then(() => {
                    //     props.actions.setCurrentPost(null);
                    //     props.actions.toggleModalState(false);
                    // });
                    // }

                }} />
            </Dialog>
        </div>
    );
};

PostView.propTypes = {
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        post: getViewPost(state, props),
        comments: getViewPostComments(state, props),
        ui: getUIState(state)
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
)(PostView);
