import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Toggle from 'material-ui/Toggle';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Actions from '../store/actions';
import {
    getApplicationSate
} from '../selectors';
import PostList from '../components/PostList';
import PostActions from '../components/PostActions';

const Home = (props) => {
    return (
        <div className="posts-list">
            <Toolbar>
                <ToolbarGroup firstChild={true}>
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
                <ToolbarGroup style={{ zIndex: '2000' }}>
                    <FloatingActionButton mini={true} onClick={() => {
                        props.actions.setPostFormMode('create');
                        props.actions.toggleModalState('post', true);
                    }}>
                        <ContentAdd />
                    </FloatingActionButton>
                </ToolbarGroup>
            </Toolbar>
            <PostList/>
            <PostActions/>
        </div>
    );
};

Home.propTypes = {
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
)(Home);
