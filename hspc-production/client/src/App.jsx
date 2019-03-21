import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SecureRoute } from 'react-route-guard';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Navbar from './components/navbar/TopNavbar';
import Competitions from './components/competitions/Competitions';

import StudentDash from './components/student/StudentDash';
import VolunteerDash from './components/volunteer/VolunteerDash';
import JudgeDash from './components/judge/JudgeDash';
import AdvisorDash from './components/advisor/AdvisorDash';
import AdminDash from './components/admin/AdminDash';
import MasterDash from './components/master/MasterDash';
import Scoreboard from './components/scoreboard/Scoreboard';

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