import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Table, NavDropdown, Jumbotron } from 'react-bootstrap';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import UserService from '../_common/services/user';
import TeamService from '../_common/services/team';
import UpgradeService from '../_common/services/upgrade';
import EventService from '../_common/services/event';
import Register from './register-user.jsx';
import RegisterTeam from './register-team.jsx';
import Scoreboard from './scoreboard.jsx';
import BoardSetup from './create-scoreboard.jsx';
import CreateEvent from './create-event';
import CreateNews from './create-news';
import AddUser from './create-user.jsx';
import PublishPractice from './publish-practice.jsx';
import PublishScores from './publish-scores.jsx';
import DeleteIcon from '@material-ui/icons/Delete';
import AcceptIcon from '@material-ui/icons/Done';
import Email from './create-email';

import '../_common/assets/css/register-user.css';
import '../_common/assets/css/dashboard-admin.css';

var currentView = null;

export default class AdminDash extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.currentView = null;
        this.state = {
            userTable: [],
            eventTable: [],
            teamTable: [],
            requestTable: [],
        };
    }

    /* 
    * Renders the Register.jsx component. Prompts the user to create a new user.
    */
    handleCreateUser = () => {
        currentView = <Register />;
        this.forceUpdate();
    }

    /*
    * Renders the RegisterTeam.jsx component. Prompts the user to create a new team.
    */
    handleCreateTeam = () => {
        currentView = <RegisterTeam />
        this.forceUpdate();
    }

    /*
    * Renders the AddUser.jsx component. Prompts the user to a new team member or update their information.
    */
    handleAddToTeam = () => {
        currentView = <AddUser />
        this.forceUpdate();
    }

    /*
    * Renders the CreateEvent.jsx component. Prompts the user to create a new event.
    */
    handleCreateEvent = () => {
        currentView = <CreateEvent />
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
    * IN PROGRESS
    * Renders the Email.jsx component. Only available to users with an access level of >3 by default. 
    */
    handleCreateEmail = () => {
        currentView = <Email />
        this.forceUpdate();
    }

    /*
    * IN PROGRESS
    * Renders the BoardSetup.jsx component. Only available to users with an access level of >=3 by default. 
    */
    handleEditBoard = () => {
        currentView = <BoardSetup />
        this.forceUpdate();
    }

    handleCreateNews = () => {
        currentView = <CreateNews />
        this.forceUpdate();
    }

    /*
    * Renders the PublishPractice.jsx component. Only available to users with an access level of >=4 by default.
    */
    handlePublishPractice = () => {
        currentView = <PublishPractice />
        this.forceUpdate();
    }

    /*
    * Renders the PublishScores.jsx component. Only available to users with an access level of >=4 by default.
    */
    handlePublishScores = () => {
        currentView = <PublishScores />
        this.forceUpdate();
    }

    /*
    * Shows outstanding requests for a higher level accounts.
    */
    handlePendingRequests = () => {
        UpgradeService.getAllUpgrades().then((response) => {
            console.log(JSON.parse(response.body));
            if (response.statusCode === 200) {
                this.setState({ requestTable: JSON.parse(response.body) }, () => {
                    this.generateRequestTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a JSON message of all registered users. Helper function needed to generate this data as a table.
    */
    handleShowUsers = () => {
        UserService.getAllUsers().then((response) => {
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
        TeamService.getAllTeams().then((response) => {
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
        EventService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                this.setState({ eventTable: JSON.parse(response.body) }, () => {
                    this.generateEventTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for generateRequestTable. Updates the users AccessLevel.
    */
    handleAcceptRequest = (email, level) => {
        UpgradeService.acceptUpgradeRequest(email, level).then((response) => {
            if (response.statusCode === 200) {
                this.handlePendingRequests();
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for generateRequestTable. Deletes the user from the database.
    */
    handleDenyRequest = (email) => {
        UpgradeService.removeUpgradeRequest(email).then((response) => {
            if (response.statusCode === 200) {
                this.handlePendingRequests();
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
                <td>{request.TeamName}</td>
                <td>{request.FirstName}</td>
                <td>{request.LastName}</td>
                <td>{request.Email}</td>
                <td>{request.Phone}</td>
                <td>{request.RequestLevel}</td>
                <td>
                    <AcceptIcon onClick={() => this.handleAcceptRequest(request.Email, request.RequestLevel)} />
                    <DeleteIcon onClick={() => this.handleDenyRequest(request.Email)} />
                </td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Requested Level</th>
                    <th>Activate</th>
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
                <td>{event.EventDescription}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
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
                <td>{user.TeamName}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.AccessLevel}</td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
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
    *  Renders the component UI.
    */
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
                                <NavItem eventKey={1} onClick={this.handlePendingRequests}>Upgrade Requests</NavItem>
                                <NavItem eventKey={2} onClick={this.handleCreateUser}>Create User</NavItem>
                                <NavItem eventKey={3} onClick={this.handleShowUsers}>View Users</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Teams" id="basic-nav-dropdown">
                                <NavItem eventKey={4} onClick={this.handleCreateTeam}>Create Team</NavItem>
                                <NavItem eventKey={5} onClick={this.handleAddToTeam}>Add To Team</NavItem>
                                <NavItem eventKey={6} onClick={this.handleShowTeams}>View Teams</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Events" id="basic-nav-dropdown">
                                <NavItem eventKey={7} onClick={this.handleCreateEvent}>Schedule Event</NavItem>
                                <NavItem eventKey={8} onClick={this.handleShowEventHistory}>View Events</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Scoreboard" id="basic-nav-dropdown">
                                <NavItem eventKey={9} onClick={this.handleShowScore}>Preview</NavItem>
                                <NavItem eventKey={10} onClick={this.handleEditBoard}>Edit</NavItem>
                            </NavDropdown>

                            <NavDropdown title="Resources" id="basic-nav-dropdown">
                            <NavItem eventKey={11} onClick={this.handlePublishPractice}>Publish Practice Questions</NavItem>
                                <NavItem eventKey={12} onClick={this.handlePublishScores}>Publish Scorecards</NavItem>
                                <NavItem eventKey={13} onClick={this.handleCreateEmail}>Create Email Alert</NavItem>
                                <NavItem eventKey={14} onClick={this.handleCreateNews}>Update Newsfeed</NavItem>
                            </NavDropdown>

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