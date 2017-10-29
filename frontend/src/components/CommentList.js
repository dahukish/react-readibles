import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {
    getViewPostComments
} from '../selectors';
import * as Actions from '../store/actions';

const CommentList = (props) => {
    return (
        props.comments.map((comment) => (
            <Card key={comment.id}>
                <CardHeader
                    title={comment.author}
                >
                </CardHeader>
                <CardText>
                <div>Vote Score: {comment.voteScore}</div>
                <p>{comment.body}</p>
                </CardText>
                <CardActions>
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.voteForComment(
                            comment.id,
                            'upVote'
                        );
                    }}>
                        <ActionThumbUp />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.voteForComment(
                            comment.id,
                            'downVote'
                        );
                    }}>
                        <ActionThumbDown />
                    </FloatingActionButton>
                    <FlatButton label="Edit Comment" onClick={() => {
                        props.actions.setCommentFormMode('edit');
                        props.actions.setCurrentComment(comment);
                        props.actions.toggleModalState('comment', true);
                    }} />
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.deleteComment(comment.id);
                    }}>
                        <ActionDelete />
                    </FloatingActionButton>
                </CardActions>
            </Card>
        ))
    );
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        comments: getViewPostComments(state, props)
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
)(CommentList);