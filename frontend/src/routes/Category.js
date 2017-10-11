import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Actions from '../store/actions';
import { getPostsForCategoryWithCommentCount } from '../selectors';

const onclick = (buttonName) => {
    console.log(`${buttonName} be clicked dude!`);
};

const Category = (props) => {
    return (
        <div className="posts-list">
            {
                props.posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader
                            title={post.title}
                            subtitle={post.author}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <div>Vote Score: {post.voteScore}</div>
                        <div>Category: {post.category}</div>
                        <div>Comments: {post.commentCount}</div>
                        <CardActions>
                            <FloatingActionButton mini={true} onClick={() => {
                                props.actions.voteForPost(post.id, 'upVote');
                            }}>
                                <ActionThumbUp />
                            </FloatingActionButton>
                            <FloatingActionButton mini={true} onClick={() => {
                                props.actions.voteForPost(post.id, 'downVote');
                            }}>
                                <ActionThumbDown />
                            </FloatingActionButton>
                            <FlatButton label="View Post" onClick={() => {
                                onclick(`view post for ${post.id}`);
                            }} />
                            <FlatButton label="Edit Post" onClick={() => {
                                onclick(`view post for ${post.id}`);
                            }} />
                            <FloatingActionButton mini={true} onClick={() => {
                                onclick('delete');
                            }}>
                                <ActionDelete />
                            </FloatingActionButton>
                        </CardActions>
                        <CardText expandable={true}>
                            TODO: COMMENTS GO HERE
                </CardText>
                    </Card>
                ))
            }
        </div>
    );
};

Category.propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        posts: getPostsForCategoryWithCommentCount(state, props),
        categories: state.categoriesReducer.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions.default, dispatch)
    }
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Category)
);