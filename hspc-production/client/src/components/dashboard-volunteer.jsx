import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Table, Jumbotron } from 'react-bootstrap';
import userService from '../_common/services/user';
import teamService from '../_common/services/team';
import eventService from '../_common/services/event';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import '../_common/assets/css/dashboard-volunteer.css';

var currentView = null;

export default class JudgeDash extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            userTable: [],
            eventTable: [],
            teamTable: []
        };
    }

    /*
    * Returns a JSON message of all registered users. Helper function needed to generate this data as a table.
    */
    handleShowUsers = () => {
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ userTable: JSON.parse(response.body) }, () => {
                    this.generateUserTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a JSON message of all registered teams. Helper function needed to generate this data as a table.
    */
    handleShowTeams = () => {
        teamService.getAllTeams().then((response) => {
            if (response.statusCode === 200) {
                console.log(JSON.parse(response.body));
                this.setState({ teamTable: JSON.parse(response.body) }, () => {
                    this.generateTeamTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a JSON message of all scheduled events. Helper function needed to generate this data as a table.
    */
    handleShowEventHistory = () => {
        eventService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ eventTable: JSON.parse(response.body) }, () => {
                    this.generateEventTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for handlePendingRequests. Generates the data as a table.
    */
    generateRequestTable() {
        const requests = [];
        this.state.requestTable.forEach((request, index) => {
            requests.push(<tr key={index}>
                <td>{index + 1}</td>
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
    * Helper function for handleShowEvent. Generates the data as a table.
    */
    generateEventTable() {
        const events = [];
        console.log(this.state.eventTable);
        this.state.eventTable.forEach((event, index) => {
            events.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{event.EventLocation}</td>
                <td>{event.EventDate}</td>
                <td>{event.EventTime}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {events}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowUsers. Generates the data as a table.
    */
    generateUserTable() {
        const users = [];
        this.state.userTable.forEach((user, index) => {
            users.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.AccessLevel}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Account Level</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Helper function for handleShowTeams. Generates the data as a table.
    */
    generateTeamTable() {
        const teams = [];
        this.state.teamTable.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.SchoolAddress}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>School</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>Level</th>
                    <th>Advisor</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Resets the currentView property to null and clears the screen.
    */
    clearAll = () => {
        currentView = null;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand
                            onClick={this.clearAll}>
                            Volunteer Portal
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={this.handleShowUsers}>View Users</NavItem>
                            <NavItem eventKey={2} onClick={this.handleShowTeams}>View Teams</NavItem>
                            <NavItem eventKey={3} onClick={this.handleShowEventHistory}>View Events</NavItem>
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