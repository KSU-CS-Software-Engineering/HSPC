import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Home from './components/public-homepage';
import Login from './components/public-login';
import Register from './components/register-user';
import Navbar from './components/public-navbar';
import Competitions from './components/public-competitions';
import Scoreboard from './components/scoreboard';

import StudentDash from './components/dashboard-student';
import VolunteerDash from './components/dashboard-volunteer';
import JudgeDash from './components/dashboard-judge';
import AdvisorDash from './components/dashboard-advisor';
import AdminDash from './components/dashboard-admin';
import MasterDash from './components/dashboard-master';

import StudentAuthGuard from './_common/guards/student';
import VolunteerAuthGuard from './_common/guards/volunteer';
import JudgeAuthGuard from './_common/guards/judge';
import AdminAuthGuard from './_common/guards/admin';
import AdvisorAuthGuard from './_common/guards/advisor';
import MasterAuthGuard from './_common/guards/master';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/Competitions" component={Competitions} />
            <SecureRoute path='/student/studentdash' component={StudentDash} routeGuard={StudentAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/volunteer/volunteerdash' component={VolunteerDash} routeGuard={VolunteerAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/judge/judgedash' component={JudgeDash} routeGuard={JudgeAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/advisor/advisordash' component={AdvisorDash} routeGuard={AdvisorAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/admin/admindash' component={AdminDash} routeGuard={AdminAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/master/masterdash' component={MasterDash} routeGuard={MasterAuthGuard} redirectToPathWhenFail='/login' />
            <SecureRoute path='/scoreboard/scoreboard' component={Scoreboard} routeGuard={AdminAuthGuard} redirectToPathWhenFail='/login' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;