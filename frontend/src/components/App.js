import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Routes from '../routes';
import * as Actions from '../store/actions';

class App extends Component {

  componentWillMount() {
    this.props.actions.fetchPosts().then(data => {
      const { posts } = data;
      const postIDs = posts.map(post => {
        return post.id;
      });
      this.props.actions.fetchAllComments(postIDs);
    });
    this.props.actions.fetchCategories();
  }

  render() {
    return (
      <div className="App">
        <header>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </header>
        <Switch>
          <Route exact path="/" component={Routes.Home} />
          <Route path="/:category" component={Routes.Category} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions.default, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(App);
