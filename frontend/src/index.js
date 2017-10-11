import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import store from './store/store';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();


