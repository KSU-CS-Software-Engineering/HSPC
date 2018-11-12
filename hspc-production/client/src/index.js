import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Security, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://dev-996142.oktapreview.com/dev/console',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oahawo8og2PdREgB0h7'
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
