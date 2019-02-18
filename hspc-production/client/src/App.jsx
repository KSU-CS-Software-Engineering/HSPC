import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/portals/register/Register'
import Navbar from './components/TopNavbar';

import StudentDash from './components/portals/student/StudentDash';
import VolunteerDash from './components/portals/volunteer/VolunteerDash';
import JudgeDash from './components/portals/judge/JudgeDash';
import AdvisorDash from './components/portals/advisor/AdvisorDash';
import AdminDash from './components/portals/admin/AdminDash';
import MasterDash from './components/portals/master/MasterDash';
import Scoreboard from './components/portals/scoreboard/Scoreboard';

import StudentAuthGuard from './_common/guards/student';
import VolunteerAuthGuard from './_common/guards/volunteer';
import JudgeAuthGuard from './_common/guards/judge';
import AdminAuthGuard from './_common/guards/admin';
import AdvisorAuthGuard from './_common/guards/advisor';
import MasterAuthGuard from './_common/guards/master';

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
            <SecureRoute path='/student/studentdash' component={StudentDash} routeGuard={StudentAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/volunteer/volunteerdash' component={VolunteerDash} routeGuard={VolunteerAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/judge/judgedash' component={JudgeDash} routeGuard={JudgeAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/advisor/advisordash' component={AdvisorDash} routeGuard={AdvisorAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/admin/admindash' component={AdminDash} routeGuard={AdminAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/master/masterdash' component={MasterDash} routeGuard={MasterAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/scoreboard/scoreboard' component={Scoreboard} routeGuard={AdminAuthGuard} redirectToPathWhenFail='/login' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
