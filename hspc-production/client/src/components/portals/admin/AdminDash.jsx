import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Table, NavDropdown, Jumbotron } from 'react-bootstrap';
import userService from '../../../_common/services/user';
import teamService from '../../../_common/services/team';
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import Register from '../../Register.jsx';
import RegisterTeam from '../../RegisterTeam.jsx';
import Scoreboard from '../scoreboard/Scoreboard.jsx';
import CreateEvent from '../events/CreateEvent';
import './AdminDash.css';

var currentView = null;

export default class AdminDash extends Component {
    constructor(props) {
        super(props)
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleShowUsers = this.handleShowUsers.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleShowEventHistory = this.handleShowEventHistory.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.statusMessages = React.createRef();
        this.state = {
            userTable: [],
            eventTable: [],
            teamTable: [],
            requestTable: []
        };
    }

    /*
    * WORKING
    * Handles the registration of a new students, volunteers, judges, and adviosrs.
    */
    handleCreateUser() {
        currentView = <Register />;
        this.forceUpdate();
    }

    /*
    * PARTIALLY WORKING
    * Prompts the user to create a new team.
    */
    handleCreateTeam() {
        currentView = <RegisterTeam />
        this.forceUpdate();
    }

    /*
    * SUSPECT
    * Prompts the user to create a new event.
    */
    handleCreateEvent() {
        currentView = <CreateEvent />
        this.forceUpdate();
    }

    /*
    * PARTIALLY WORKING
    * Renders the hidden scoreboard.
    */
    handleShowScore() {
        currentView = <Scoreboard />
        this.forceUpdate();
    }

    /*
    * WORKING
    * Resets the currentView property to null.
    */
    clearAll() {
        currentView = null;
        this.forceUpdate();
    }

    /*
    * HIGHLY SUSPECT
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests() {
        userService.getAllRequests().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ requestTable: JSON.parse(response.body) }, () => {
                    this.generateRequestTable();
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * WORKING
    * Returns a list of all registered users
    */
    handleShowUsers() {
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {
                    this.generateUserTable();
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * WORKING?
    * Shows a table of all registered teams and information about them.
    */
    handleShowTeams() {
        teamService.getAllTeams().then((response) => {
            if (response.statusCode === 200) {
                console.log(JSON.parse(response.body));
                this.setState({ teamTable: JSON.parse(response.body) }, () => {

                    alert("Working");
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * SUSPECT
    * Shows a table of previous events and participants.
    */
    handleShowEventHistory() {
        userService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ eventTable: JSON.parse(response.body) }, () => {
                    this.generateEventTable();
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * SUSPECT
    * Helper function for handlePendingRequests. Generates a table component.
    */
    generateRequestTable() {
        const requests = [];
        this.state.requestTable.forEach((user, index) => {
            requests.push(<tr key={index}>
                <td>{index}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {requests}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * WORKING
    * Helper function for handleShowUsers. Generates a table component.
    */
    generateUserTable() {
        const users = [];
        this.state.userTable.forEach((user, index) => {
            users.push(<tr key={index}>
                <td>{index}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * SUSPECT
    * Helper function for handleShowEvent. Generates a table component.
    */
    generateEventTable() {
        const events = [];
        this.state.eventTable.forEach((user, index) => {
            events.push(<tr key={index}>
                <td>{index}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {events}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Admin Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown title="Users" id="basic-nav-dropdown">
                                <NavItem eventKey={1} onClick={this.handlePendingRequests}>Pending Requests</NavItem>
                                <NavItem eventKey={2} onClick={this.handleCreateUser}>Create User</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowUsers}>View Users</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavItem eventKey={4} onClick={this.handleCreateTeam}>Create Team</NavItem>
                                <NavItem eventKey={5}>Add To Team</NavItem>
                                <NavItem eventKey={6} onClick={this.handleShowTeams}>View Teams</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Events" id="basic-nav-dropdown">
                                <NavItem eventKey={7} onClick={this.handleCreateEvent}>Schedule Event</NavItem>
                                <NavItem eventKey={8} onClick={this.handleShowEventHistory}>Event History</NavItem>
                            </NavDropdown>

                            <NavItem eventKey={9} onClick={this.handleShowScore}>Scoreboard</NavItem>
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