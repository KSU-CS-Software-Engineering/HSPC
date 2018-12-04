import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Scoreboard from './components/Scoreboard';
import Navbar from './components/TopNavbar';
import Loginscreen from './components/Loginscreen';
import Administrator from './components/Administrator';

/*
//okta api code
import { Security, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://dev-996142.oktapreview.com/admin/app/oidc_client/instance/0oahawo8og2PdREgB0h7#tab-general',
  redirect_uri: http://localhost:3000/implicit/callback,
  client_id: '0oahawo8og2PdREgB0h7'
} 
*/

class App extends Component {
  render() {
    return (

      <Router>
        <div>
        <Navbar />
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/scoreboard" component={Scoreboard}/>
            <Route path="/administrator" component={Administrator}/>
	      </div>
      </Router>
    );
  }
}

export default App;
