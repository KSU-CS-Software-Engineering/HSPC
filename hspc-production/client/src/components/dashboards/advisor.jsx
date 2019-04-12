import React, { Component } from 'react';
import { Navbar, NavItem, Nav, NavDropdown, Jumbotron } from 'react-bootstrap';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import UserService from '../../_common/services/user';
import ViewUsers from '../registration/view/users';
import ViewTeams from '../registration/view/teams';
import AddUser from '../registration/create/add-team-member';
import RegisterTeam from '../registration/create/team';
import Scoreboard from '../scoring/scoreboard.jsx';
import '../../_common/assets/css/register-user.css';
import '../../_common/assets/css/dashboard-admin.css';

var currentView = null;

export default class AdvisorDash extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.currentView = null;
        this.advisors = null;
        this.currentUser = this.props.location.state;
        this.currentUserName = '';
        this.state = {
            userTable: [],
            eventTable: []
        };
    }

    /*
    * Returns the first name and last name of the current user.
    */
    componentDidMount = () => {
        var users = [];
        UserService.getAllUsers()
            .then((response) => {
                let data = JSON.parse(response.body);
                data.forEach((user, index) => {
                    if (user.AccessLevel === '4') {
                        users.push({
                            id: index,
                            FirstName: user.FirstName,
                            LastName: user.LastName
                        });
                    }
                    if (user.Email === this.currentUser) {
                        this.currentUserName = {
                            FirstName: user.FirstName,
                            LastName: user.LastName
                        };
                    }
                });
                this.advisors = users;
                this.handleShowDefault();
            })
            .catch(() => {
                console.log("No users fonund");
            })
    }

    /*
    * Renders the RegisterTeam.jsx component. Prompts the user to create a new team.
    */
    handleCreateTeam = () => {
        currentView = <RegisterTeam advisor={this.currentUser}/>
        this.forceUpdate();
    }

    /*
    * Renders the AddUser.jsx component. Prompts the user to a new team member or update their information.
    */
    handleAddToTeam = () => {
        currentView = <AddUser advisor={this.currentUser}/>
        this.forceUpdate();
    }

    /*
    * Returns a JSON message of all registered teams. Helper function needed to generate this data as a table.
    */
    handleShowTeams = () => {
        currentView = <ViewTeams advisor={this.currentUser}/>
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
    * Returns a JSON message of all registered users. Helper function needed to generate this data as a table.
    */
    handleShowUsers = () => {
        currentView = <ViewUsers />
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
                            Advisor Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavItem eventKey={1} onClick={this.handleCreateTeam}>Register Team</NavItem>
                                <NavItem eventKey={2} onClick={this.handleAddToTeam}>Add User</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowTeams}>View Teams</NavItem>
                            </NavDropdown>
                            <NavItem eventKey={4} onClick={this.handleShowScore}>View Board</NavItem>
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