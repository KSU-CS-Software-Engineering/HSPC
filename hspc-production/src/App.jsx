import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Scoreboard from './components/Scoreboard';
import Navbar from './components/TopNavbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Navbar />
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/> 
          <Route path="/scoreboard" component={Scoreboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
