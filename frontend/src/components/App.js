import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Routes from '../routes';
import * as Actions from '../store/actions';
import { getLocation } from '../selectors';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch);

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
            iconElementLeft={<span></span>}
            title="React Readibles"
          />
        </header>
        <ConnectedSwitch>
          <Route exact path="/" component={Routes.Home} />
          <Route exact path="/:category" component={Routes.Category} />
          <Route exact path="/:category/:id" component={Routes.PostView} />
          <Route exact path="*" component={Routes.Home} />
        </ConnectedSwitch>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapSateToProps = (state) => {
  return {
    location: getLocation(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions.default, dispatch)
  }
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
