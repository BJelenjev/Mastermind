import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store, {history} from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './App';
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
