import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavDropdown, Jumbotron } from 'react-bootstrap';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import EventSignIn from '../registration/create/event-signin';
import ViewEvents from '../registration/view/events';
import ViewUsers from '../registration/view/users';
import ViewTeams from '../registration/view/teams';
import Scoreboard from '../scoring/scoreboard.jsx';
import UserService from '../../_common/services/user';
import '../../_common/assets/css/register-user.css';
import '../../_common/assets/css/dashboard-admin.css';

var currentView = '';

/*
* @author: Daniel Bell
*/
export default class JudgeDash extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.currentView = null;
        this.currentUser = this.props.location.state;
        this.currentUserName = {};
        this.state = {
            userTable: [],
            eventTable: []
        };
    }

    /*
    * Finds the name of the current user and displays it.
    */
    componentDidMount = () => {
        UserService.getAllUsers()
            .then((response) => {
                let body = JSON.parse(response.body);
                if (response.statusCode === 200) {
                    let user = {};
                    for (let i = 0; i < body.length; i++) {
                        if (body[i].Email === this.currentUser) {
                            user = {
                                FirstName: body[i].FirstName,
                                LastName: body[i].LastName
                            };
                        }
                    }
                    this.currentUserName = user;
                    this.handleShowDefault();
                }
            })
            .catch((resErr) => {
                console.log('Something went wrong. Please try again');
            });
    }

    /*
    * Returns a JSON message of all registered teams. Helper function needed to generate this data as a table.
    */
    handleShowTeams = () => {
        currentView = <ViewTeams />
        this.forceUpdate();
    }

    /*
    * Renders the Scoreboard.jsx component. Only available to users with an access level of >3 by default. 
    */
    handleShowScore = () => {
        currentView = <Scoreboard />
        this.forceUpdate();
    }

    /*
    * Shows a table of all teams and allows the user to mark whether the team is present.
    */
    handleEventSignIn = () => {
        currentView = <EventSignIn />
        this.forceUpdate();
    }

    /*
    * Returns a JSON message of all registered users. Helper function needed to generate this data as a table.
    */
    handleShowUsers = () => {
        currentView = <ViewUsers />
        this.forceUpdate();
    }

    /*
    * Returns a JSON message of all scheduled events. Helper function needed to generate this data as a table.
    */
    handleShowEventHistory = () => {
        currentView = <ViewEvents />
        this.forceUpdate();
    }

    /*
    * Resets the currentView property to the default.
    */
    handleShowDefault = () => {
        currentView = <h2 id="welcome">Welcome {this.currentUserName.FirstName} {this.currentUserName.LastName}!</h2>;
        this.forceUpdate();
    }

    /*
    *  Renders the component UI.
    */
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.handleShowDefault}>
                            Judge Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title="View" id="basic-nav-dropdown">
                                <NavItem eventKey={1} onClick={this.handleShowUsers}>Active Users</NavItem>
                                <NavItem eventKey={2} onClick={this.handleShowTeams}>Active Teams</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowEventHistory}>Event Schedule</NavItem>
                            </NavDropdown>
                            <NavItem eventKey={4} onClick={this.handleEventSignIn}>Begin Event</NavItem>
                            <NavItem eventKey={5} onClick={this.handleShowScore}>View Board</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Jumbotron className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Jumbotron>
            </div>
        )
    }
}