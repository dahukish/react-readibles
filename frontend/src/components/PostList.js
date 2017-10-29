import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import {
    getPostsSorted,
    getCategories,
} from '../selectors';
import * as Actions from '../store/actions';

const getCategoryPath = (categories, currentCat) => {
    let categoryPath;
    if (categories.length) {
        categoryPath = categories.filter(category => category.name === currentCat)[0].path
    }
    return categoryPath || '';
};

const PostList = (props) => {
    return (
        props.posts.map((post) => (
            <Card key={post.id}>
                <CardHeader
                    title={post.title}
                    subtitle={post.author}
                >
                    <RaisedButton
                        label={post.category}
                        secondary={true}
                        onClick={() => {
                            props.actions.push(`/${getCategoryPath(props.categories, post.category)}`);
                        }} />
                </CardHeader>
                <CardText>
                    <div>Vote Score: {post.voteScore}</div>
                    <div>Comments: {post.commentCount}</div>
                </CardText>
                <CardActions>
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.voteForPost(
                            post.id,
                            'upVote'
                        );
                    }}>
                        <ActionThumbUp />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.voteForPost(
                            post.id,
                            'downVote'
                        );
                    }}>
                        <ActionThumbDown />
                    </FloatingActionButton>
                    <FlatButton label="View Post" onClick={() => {
                        props.actions.push(`/${getCategoryPath(props.categories, post.category)}/${post.id}`);
                    }}>

                    </FlatButton>
                    <FlatButton label="Edit Post" onClick={() => {
                        props.actions.setCurrentPost(post);
                        props.actions.setPostFormMode('edit');
                        props.actions.toggleModalState('post', true);
                    }} />
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.deletePost(post.id);
                    }}>
                        <ActionDelete />
                    </FloatingActionButton>
                </CardActions>
            </Card>
        ))
    );
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        posts: getPostsSorted(state, props),
        categories: getCategories(state)
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
)(PostList);