import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Scoreboard from './components/Scoreboard';
import Navbar from './components/TopNavbar';

import StudentDash from './components/portals/StudentDash';
import VolunteerDash from './components/portals/VolunteerDash';
import JudgeDash from './components/portals/JudgeDash';
import AdminDash from './components/portals/AdminDash';

import StudentAuthGuard from './_common/guards/student';
import VolunteerAuthGuard from './_common/guards/volunteer';
import JudgeAuthGuard from './_common/guards/judge';
import AdminAuthGuard from './_common/guards/admin';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/scoreboard" component={Scoreboard}/>
            <SecureRoute path='/studentdash' component={StudentDash} routeGuard={StudentAuthGuard} redirectToPathWhenFail='/login' />>
            <SecureRoute path='/volunteerdash' component={VolunteerDash} routeGuard={VolunteerAuthGuard} redirectToPathWhenFail='/login' />>
            <SecureRoute path='/judgedash' component={JudgeDash} routeGuard={JudgeAuthGuard} redirectToPathWhenFail='/login' />>
            <SecureRoute path='/admindash' component={AdminDash} routeGuard={AdminAuthGuard} redirectToPathWhenFail='/login' />>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
