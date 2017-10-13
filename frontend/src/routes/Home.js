import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import uuidv4 from 'uuid/v4';
import * as Actions from '../store/actions';
import { getPostsWithCommentCount, getCategories, getPostSortState } from '../selectors';
import PostForm from '../forms/post';

const onclick = (buttonName) => {
    console.log(`${buttonName} be clicked yo!`);
};

const getCategoryPath = (categories, currentCat) => {
    let categoryPath;
    console.log(categories, currentCat);
    if (categories.length) {
        categoryPath = categories.filter(category => category.name === currentCat)[0].path
    }
    return categoryPath || '';
};

const Home = (props) => {
    return (
        <div className="posts-list">
            <div className="tool-bar">
                <Toggle
                    label="Sort By Date (Default is Vote Score)"
                    defaultToggled={false}
                    onToggle={() => {
                        const newToggleState = !props.sort.togglePostTypeUIState;
                        const newSortType = (newToggleState === true) ? 'timestamp' : 'voteScore';
                        props.actions.togglePostSortType(newToggleState);
                        props.actions.changePostsSort(newSortType, props.sort.sortPostOrder);
                    }}
                    labelPosition="right"
                    style={{ margin: 20 }}
                />
                <Toggle
                    label="Sort Asc (Default is Desc)"
                    defaultToggled={true}
                    onToggle={() => {
                        const newToggleState = !props.sort.togglePostOrderUIState;
                        const newOrder = (newToggleState === true) ? 'asc' : 'desc';
                        props.actions.togglePostSortOrder(newToggleState);
                        props.actions.changePostsSort(props.sort.sortPostType, newOrder);
                    }}
                    labelPosition="right"
                    style={{ margin: 20 }}
                />
                <FloatingActionButton mini={true} onClick={() => {
                    props.actions.toggleModalState(true);
                }}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            {
                props.posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader
                            title={post.title}
                            subtitle={post.author}
                        >
                            <RaisedButton
                                label={post.category}
                                secondary={true}
                                href={`/${getCategoryPath(props.categories, post.category)}`}

                            />
                        </CardHeader>
                        <div>Vote Score: {post.voteScore}</div>
                        <div>Comments: {post.commentCount}</div>
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
                                onclick(`view post for ${post.id}`);
                            }} />
                            <FlatButton label="Edit Post" onClick={() => {
                                props.actions.setCurrentPost(post);
                                props.actions.toggleModalState(true);
                            }} />
                            <FloatingActionButton mini={true} onClick={() => {
                                props.actions.deletePost(post.id);
                            }}>
                                <ActionDelete />
                            </FloatingActionButton>
                        </CardActions>
                    </Card>
                ))
            }
            <Dialog
                open={props.sort.modalOpen}
                actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={() => {
                            props.actions.resetPostForm();
                            props.actions.toggleModalState(false);
                        }}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={() => {
                            props.actions.submitPostForm();
                            props.actions.toggleModalState(false);
                        }}
                    />,
                ]}
            >
                <PostForm onSubmit={(values) => {
                    const newPost = {
                        id: uuidv4(),
                        timestamp: Date.now(),
                        voteScore: 1,
                        ...values
                    };
                    props.actions.submitNewPostValues(newPost).then(() => {
                        props.actions.setCurrentPost(null);
                        props.actions.toggleModalState(false);
                    });
                }} />
            </Dialog>
        </div>
    );
};

Home.propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        posts: getPostsWithCommentCount(state),
        categories: getCategories(state),
        sort: getPostSortState(state)
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
    )(Home)
);