import React, { Component } from 'react';
import { Panel, Navbar, NavItem, Nav, Table } from 'react-bootstrap';
import userService from '../../../_common/services/user';
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
            userTable: [], eventTable: [], requestTable: []
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
    * SUSPECT
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
    * SUSPECT
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests() {
        userService.getAllRequests().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ requestTable: JSON.parse(response.body) }, () => {
                    alert("information corrrect");
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
                            <NavItem
                                onClick={this.handlePendingRequests}
                                eventKey={1}>
                                Pending Requests
                            </NavItem>

                            <NavItem
                                onClick={this.handleCreateUser}
                                eventKey={2}>
                                Create User
                            </NavItem>

                            <NavItem
                                onClick={this.handleShowUsers}
                                eventKey={3}>
                                User List
                            </NavItem>

                            <NavItem
                                onClick={this.handleCreateTeam}
                                eventKey={4}>
                                Create Team
                            </NavItem>

                            <NavItem
                                onClick={this.handleCreateEvent}
                                eventKey={5}>
                                Schedule Event
                            </NavItem>

                            <NavItem
                                onClick={this.handleShowEventHistory}
                                eventKey={6}>
                                Event History
                            </NavItem>

                            <NavItem
                                onClick={this.handleShowScore}
                                eventKey={7}>
                                Scoreboard
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Panel className="page-body">
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    {currentView}
                </Panel>
            </div>
        )
    }
}