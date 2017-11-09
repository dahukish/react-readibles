import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import uuidv4 from 'uuid/v4';
import { history } from '../history';
import * as Actions from '../store/actions';
import {
    getViewPost,
    getApplicationSate
} from '../selectors';
import CommentForm from '../forms/comment';
import CommentList from '../components/CommentList';
import PostActions from '../components/PostActions';


class PostView extends Component {

    isValidPost(paramId) {
        const { id } = this.props;
        return id && id === paramId;
    }

    render() {
        const {
            id,
            timestamp,
            title,
            author,
            body,
            category,
            deleted,
            commentCount,
            voteScore
            } = this.props;
        return (
            <div>
                {!this.isValidPost(id) && (<Redirect to={'/'} />)}
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <RaisedButton label="Back" primary={true} onClick={() => {
                            this.props.actions.push('/');
                        }} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Upvote" primary={true} onClick={() => {
                            this.props.actions.voteForPost(
                                id,
                                'upVote'
                            );
                        }} />
                        <RaisedButton label="Downvote" primary={true} onClick={() => {
                            this.props.actions.voteForPost(
                                id,
                                'downVote'
                            );
                        }} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Edit" primary={true} onClick={() => {
                            this.props.actions.setCurrentPost({
                                id,
                                timestamp,
                                title,
                                author,
                                body,
                                category,
                                deleted,
                                commentCount,
                                voteScore
                            });
                            this.props.actions.setPostFormMode('edit');
                            this.props.actions.toggleModalState('post', true);
                        }} />
                        <RaisedButton label="Delete" primary={true} onClick={() => {
                            this.props.actions.deletePost(id).then(history.push('/'));
                        }} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <RaisedButton label="Add New Comment" primary={true} onClick={() => {
                            this.props.actions.setCommentFormMode('create');
                            this.props.actions.toggleModalState('comment', true);
                        }} />
                    </ToolbarGroup>
                </Toolbar>

                {
                    id && (
                        <Card key={id}>
                            <CardHeader
                                title={title}
                                subtitle={author}
                            >
                            </CardHeader>
                            <CardText>
                                <Chip style={{ marginBottom: '2em' }}>{category}</Chip>
                                <div>Vote Score: {voteScore}</div>
                                <div>Comments: {commentCount}</div>
                                <p>{body}</p>
                            </CardText>
                        </Card>
                    )
                }
                <CommentList match={this.props.match} />
                <PostActions />
                <Dialog
                    open={this.props.ui.modals.comment}
                    actions={[
                        <FlatButton
                            key={'cancelButton'}
                            label="Cancel"
                            primary={true}
                            onClick={() => {
                                this.props.actions.resetCommentForm();
                                this.props.actions.toggleModalState('comment', false);
                            }}
                        />,
                        <FlatButton
                            key={'submitButton'}
                            label="Submit"
                            primary={true}
                            onClick={() => {
                                this.props.actions.submitCommentForm();
                                this.props.actions.toggleModalState('comment', false);
                            }}
                        />,
                    ]}
                >
                    <CommentForm onSubmit={(values) => {
                        if (this.props.ui.commentFormMode === 'create') {
                            const newComment = {
                                id: uuidv4(),
                                timestamp: Date.now(),
                                parentId: id,
                                ...values
                            };
                            this.props.actions.submitNewCommentValues(newComment);
                        } else {
                            const updatedComment = {
                                timestamp: Date.now(),
                                ...values
                            };
                            this.props.actions.submitUpdatedCommentValues(values.id, updatedComment).then(() => {
                                this.props.actions.toggleModalState('comment', false);
                            });
                        }

                    }} />
                </Dialog>

            </div>
        );
    }
};

PostView.propTypes = {
    match: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired
};

PostView.defaultProps = {
    id: '',
    timestamp: 0,
    title: '',
    author: '',
    body: '',
    category: '',
    deleted: false,
    commentCount: 0,
    voteScore: 0
};

const mapStateToProps = (state, props) => {
    return {
        ...getViewPost(state, props),
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
)(PostView);
