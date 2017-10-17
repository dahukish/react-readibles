import * as posts from './posts';
import * as categories from './categories';
import * as comments from './comments';
import * as application from './application';
import { routerActions } from 'react-router-redux';

export default {
  ...application,
  ...posts,
  ...categories,
  ...comments,
  ...routerActions
};
